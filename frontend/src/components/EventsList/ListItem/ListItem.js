import React, { useContext } from 'react';

import { GlobalContext } from '../../../context/GlobalState';
import './ListItem.css';

const ListItem = ({ title, price, date, creator }) => {
  const { userId } = useContext(GlobalContext);
  const d = new Date(date);
  return (
    <li className="events__list-item">
      <div>
        <h2>{title}</h2>
        <h3>
          {price} - {d.toDateString()}
        </h3>
      </div>
      <div>
        {creator._id !== userId ? (
          <button className="btn">View Details</button>
        ) : (
          <p>You are the owner</p>
        )}
      </div>
    </li>
  );
};

export default ListItem;
