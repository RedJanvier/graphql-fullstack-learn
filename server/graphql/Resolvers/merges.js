import User from '../../models/user';
import Event from '../../models/Event';
import { dateToISO } from '../../helpers/date';

let fetchEvents;
let fetchUser;

export const transformEvent = (event) => ({
  ...event._doc,
  _id: event.id,
  date: dateToISO(event._doc.date),
  creator: fetchUser.bind(this, event._doc.creator),
});
const fetchSingleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (error) {
    console.log('❌', error.message.red.bold);
    throw error;
  }
};
export const transformBooking = (booking) => ({
  ...booking._doc,
  _id: booking.id,
  createdAt: dateToISO(booking.createdAt),
  updatedAt: dateToISO(booking.updatedAt),
  event: fetchSingleEvent.bind(this, booking._doc.event),
  user: fetchUser.bind(this, booking._doc.user),
});

fetchUser = async (userID) => {
  try {
    const user = await User.findById(userID);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: fetchEvents.bind(this, user._doc.createdEvents),
    };
  } catch (error) {
    console.log('❌', error.message.red.bold);
    throw error;
  }
};
fetchEvents = async (eventIDs) => {
  try {
    const events = await Event.find({ _id: { $in: eventIDs } });
    return events.map(transformEvent);
  } catch (error) {
    console.log('❌', error.message.red.bold);
    throw error;
  }
};
