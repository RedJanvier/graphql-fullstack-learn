import { Schema, model } from 'mongoose';

const UserSchema = Schema({
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: [true, 'User already exist'],
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

export default model('User', UserSchema);
