/* eslint-disable no-useless-catch */
/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcrypt';

import Event from '../../models/Event';
import User from '../../models/user';
import Booking from '../../models/booking';

let fetchEvents;
let fetchUser;
const transformEvent = (event) => ({
  ...event._doc,
  _id: event.id,
  creator: fetchUser.bind(this, event._doc.creator),
});
fetchUser = async (userID) => {
  try {
    const user = await User.findById(userID);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: fetchEvents.bind(this, user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};
fetchEvents = async (eventIDs) => {
  try {
    const events = await Event.find({ _id: { $in: eventIDs } });
    return events.map(transformEvent);
  } catch (err) {
    throw err;
  }
};
const fetchSingleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (error) {
    throw error;
  }
};

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
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => ({
        ...booking._doc,
        _id: booking.id,
        createdAt: new Date(booking.createdAt).toISOString(),
        updatedAt: new Date(booking.updatedAt).toISOString(),
        event: fetchSingleEvent.bind(this, booking._doc.event),
        user: fetchUser.bind(this, booking._doc.user),
      }));
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
  bookEvent: async (args) => {
    try {
      const fetchedEvent = await Event.findOne({ _id: args.eventId });
      const booking = new Booking({
        event: fetchedEvent,
        user: '5e7e844556a8e31b54abedbe',
      });
      const result = await booking.save();
      return {
        ...result._doc,
        _id: result.id,
        createdAt: new Date(result.createdAt).toISOString(),
        updatedAt: new Date(result.updatedAt).toISOString(),
        event: fetchSingleEvent.bind(this, result._doc.event),
        user: fetchUser.bind(this, result._doc.user),
      };
    } catch (error) {
      throw error;
    }
  },
  cancelBooking: async (args) => {
    try {
      const booking = await Booking.findById(args.bookingId).populate('event');
      const event = {
        ...booking.event._doc,
        _id: booking.event.id,
        creator: fetchUser.bind(this, booking.event._doc.creator),
      };
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (error) {
      throw error;
    }
  },
};
