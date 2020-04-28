import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import User from '../../models/user';

export default {
  createUser: async (args) => {
    try {
      const hash = await bcrypt.hash(args.inputUser.password, 12);

      const user = new User({
        email: args.inputUser.email,
        password: hash,
      });

      return user.save().then((result) => ({
        ...result._doc,
        _id: result.id,
        password: null,
      }));
    } catch (error) {
      console.log('❌', error.message.red.bold);
      throw error;
    }
  },
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid credentials!');
      }

      const isValid =
        user.password && (await bcrypt.compare(password, user.password));
      if (!isValid) {
        throw new Error('Invalid credentials!');
      }

      return {
        userId: user._id,
        token: jwt.sign(
          {
            userId: user._id,
            email: user.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '1h',
          }
        ),
        tokenExpires: 1,
      };
    } catch (error) {
      console.log('❌', error.message.red.bold);
      throw error;
    }
  },
};
