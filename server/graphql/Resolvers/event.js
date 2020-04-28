import User from '../../models/user';
import Event from '../../models/Event';
import { transformEvent } from './merges';

export default {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(transformEvent);
    } catch (error) {
      console.log('❌', error.message.red.bold);
      throw error;
    }
  },
  createEvent: async (args, req) => {
    if (!req.withId) {
      throw new Error('Unauthenticated!');
    }
    try {
      const user = await User.findOne({
        _id: req.withId,
      });
      if (!user) throw new Error('No such user found!');

      const event = new Event({
        title: args.inputEvent.title,
        description: args.inputEvent.description,
        price: +args.inputEvent.price,
        date: new Date(args.inputEvent.date),
        creator: req.withId,
      });

      const createdEvent = await event.save();
      const { _id: eventID } = createdEvent._doc;

      await user.createdEvents.push(eventID);
      return await user.save().then(() => transformEvent(createdEvent));
    } catch (err) {
      console.log('❌ ', err.message.red.bold);
      throw err;
    }
  },
};
