import Event from '../../models/Event';
import { transformBooking, transformEvent } from './merges';
import Booking from '../../models/booking';

export default {
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(transformBooking);
    } catch (err) {
      console.log(err);
      throw err;
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
      return transformBooking(result);
    } catch (error) {
      throw error;
    }
  },
  cancelBooking: async (args) => {
    try {
      const booking = await Booking.findById(args.bookingId).populate('event');
      const event = transformEvent(booking.event);
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (error) {
      throw error;
    }
  },
};
