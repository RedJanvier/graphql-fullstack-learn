import React from 'react';

import ListItem from './ListItem/ListItem';
import './BookingsList.css';

const BookingsList = ({ bookings, onCancelBooking }) => {
  return (
    <ul className="bookings__list">
      {bookings.map((booking) => (
        <ListItem
          key={booking._id}
          {...booking}
          cancelBooking={onCancelBooking}
        />
      ))}
    </ul>
  );
};

export default BookingsList;
