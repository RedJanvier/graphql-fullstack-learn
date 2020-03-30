import User from '../../models/user';
import Event from '../../models/Event';
import { transformEvent } from './merges';

export default {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(transformEvent);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createEvent: async (args) => {
    try {
      const user = await User.findOne({
        _id: args.inputEvent.creator,
      });

      if (!user) {
        throw new Error('No such user found!');
      }

      const event = new Event({
        title: args.inputEvent.title,
        description: args.inputEvent.description,
        price: +args.inputEvent.price,
        date: new Date(args.inputEvent.date),
        creator: args.inputEvent.creator,
      });

      const createdEvent = await event.save();
      const { _id: eventID } = createdEvent._doc;

      await user.createdEvents.push(eventID);

      return await user.save().then(() => transformEvent(createdEvent));
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
