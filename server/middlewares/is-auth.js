import * as jwt from 'jsonwebtoken';

export const checkAuth = async (req, res, next) => {
  const authFail = () => {
    req.isAuth = false;
    return next();
  };
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) authFail();
    const token = req.headers.authorization.startsWith('Bearer')
      ? req.headers.authorization.split(' ')[1]
      : req.headers.authorization;

    if (!token || token === '' || token === undefined) authFail();
    let decoded;
    try {
      decoded = jwt.verfiy(token, process.env.JWT_SECRET);
    } catch (error) {
      authFail();
    }

    if (!decoded) authFail();

    req.isAuth = true;
    req.withId = decoded.userId;
    req.withEmail = decoded.email;

    return next();
  } catch (error) {
    return authFail();
  }
};
