import { Schema, model } from 'mongoose';

const EventSchema = Schema({
  title: {
    type: String,
    require: true,
    unique: true,
  },
  description: {
    type: String,
    require: true,
    unique: true,
  },
  price: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default model('Event', EventSchema);
