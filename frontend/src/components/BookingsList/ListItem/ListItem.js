import React, { useContext } from 'react';

import { GlobalContext } from '../../../context/GlobalState';
import './ListItem.css';

const ListItem = ({
  _id: bookingId,
  user,
  event,
  createdAt,
  cancelBooking,
}) => {
  const { userId } = useContext(GlobalContext);

  return (
    <li className="events__list-item">
      <div>
        <h2>{event.title}</h2>
        <h3>
          by {user.email} on {new Date(createdAt).toLocaleDateString()}
        </h3>
      </div>
      <div>
        {user._id === userId ? (
          <button
            className="btn"
            disabled={userId ? '' : 'disabled'}
            onClick={() => cancelBooking(bookingId)}
          >
            cancelBooking
          </button>
        ) : (
          <p>Not Yours!</p>
        )}
      </div>
    </li>
  );
};

export default ListItem;
