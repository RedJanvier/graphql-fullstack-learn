import bcrypt from 'bcrypt';

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
      throw error;
    }
  },
};
