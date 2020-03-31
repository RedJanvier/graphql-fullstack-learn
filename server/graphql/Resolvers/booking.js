import Event from '../../models/Event';
import { transformBooking, transformEvent } from './merges';
import Booking from '../../models/booking';

export default {
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(transformBooking);
    } catch (error) {
      console.log('❌', error.message.red.bold);
      throw error;
    }
  },
  bookEvent: async (args, req) => {
    try {
      if (!req.withId) {
        throw new Error('Unauthenticated!');
      }
      const fetchedEvent = await Event.findOne({ _id: args.eventId });
      const booking = new Booking({
        event: fetchedEvent,
        user: req.withId,
      });
      const result = await booking.save();

      return transformBooking(result);
    } catch (error) {
      console.log('❌', error.message.red.bold);
      throw error;
    }
  },
  cancelBooking: async (args, req) => {
    try {
      if (!req.withId) {
        throw new Error('Unauthenticated!');
      }
      const booking = await Booking.findById(args.bookingId).populate('event');
      const event = transformEvent(booking.event);
      await Booking.deleteOne({ _id: args.bookingId });

      return event;
    } catch (error) {
      console.log('❌', error.message.red.bold);
      throw error;
    }
  },
};
