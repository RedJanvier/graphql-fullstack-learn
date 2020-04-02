import React from 'react';

import ListItem from './ListItem/ListItem';
import './EventsList.css';

const EventsList = ({ events, onViewDetails }) => {
  return (
    <ul className="events__list">
      {events.map((event) => (
        <ListItem key={event._id} {...event} showDetails={onViewDetails} />
      ))}
    </ul>
  );
};

export default EventsList;
