import React, { useContext } from 'react';

import { GlobalContext } from '../../../context/GlobalState';
import './ListItem.css';

const ListItem = ({
  _id: eventId,
  title,
  price,
  date,
  creator,
  showDetails,
}) => {
  const { userId } = useContext(GlobalContext);

  return (
    <li className="events__list-item">
      <div>
        <h2>{title}</h2>
        <h3>
          ${price} - {new Date(date).toLocaleDateString()}
        </h3>
      </div>
      <div>
        {creator._id !== userId ? (
          <button
            className="btn"
            disabled={userId ? '' : 'disabled'}
            onClick={() => showDetails(eventId)}
          >
            View Details
          </button>
        ) : (
          <p>You are the owner</p>
        )}
      </div>
    </li>
  );
};

export default ListItem;
