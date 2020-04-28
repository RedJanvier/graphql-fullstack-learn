import eventResolvers from './event';
import bookingResolvers from './booking';
import authResolvers from './auth';

export default {
  ...eventResolvers,
  ...bookingResolvers,
  ...authResolvers,
};
