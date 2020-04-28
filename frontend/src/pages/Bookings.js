import React, { useEffect, useState, useContext } from 'react';

import BookingsList from '../components/BookingsList/BookingsList';
import Spinner from '../components/Spinner/Spinner';
import { GlobalContext } from '../context/GlobalState';

const Bookings = (props) => {
  const [bookings, setBookings] = useState([]);
  const { token } = useContext(GlobalContext);

  const onCancelBooking = async (bookingId) => {
    if (!token) return;
    const requestBody = {
      query: ` mutation {
          cancelBooking(bookingId: "${bookingId}") {
            _id
            title
            description
            price
            date
            creator {
              _id
              email
            }
          }
        }`,
    };
    const res = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!data.data.cancelBooking) return console.log('❌', data.errors);

    setBookings(bookings.filter((booking) => booking._id !== bookingId));
    console.log('✅', data.data.cancelBooking);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const requestBody = {
          query: `query {
                      bookings {
                          _id
                          user {
                            _id
                            email
                          }
                          event {
                            title
                            description
                            price
                          }
                          createdAt
                      }
                  }
                  `,
        };
        const res = await fetch('http://localhost:4000/graphql', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'Application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!data.data.bookings) return console.log('❌', data.errors);

        setBookings(data.data.bookings);
      } catch (error) {
        return console.log('❌', error);
      }
    };
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>The bookings page</h1>
      {bookings ? (
        <BookingsList bookings={bookings} onCancelBooking={onCancelBooking} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Bookings;
