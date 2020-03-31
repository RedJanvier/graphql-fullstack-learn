import * as jwt from 'jsonwebtoken';

export const checkAuth = async (req, res, next) => {
  const authFail = () => {
    req.isAuth = false;
    return next();
  };
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) return authFail();
    const token = authHeader.split(' ')[1];
    if (!token || token === '' || token === undefined) return authFail();

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.log('❌', ' error occurred: '.bgRed.bold, error.message.red);
      return authFail();
    }
    if (!decoded) return authFail();

    req.isAuth = true;
    req.withId = decoded.userId;
    req.withEmail = decoded.email;

    return next();
  } catch (error) {
    console.log('❌', ' error occurred: '.bgRed.bold, error.message.red);
    return authFail();
  }
};
