import eventResolvers from './event';
import bookingResolvers from './booking';
import authResolvers from './user';

export default {
  ...eventResolvers,
  ...bookingResolvers,
  ...authResolvers,
};
