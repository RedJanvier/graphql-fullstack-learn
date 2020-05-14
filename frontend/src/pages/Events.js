import React, { useState, useContext, useEffect } from 'react';

import './Events.css';
import Modal from '../components/Modal/Modal';
import EventsList from '../components/EventsList/EventsList';
import Spinner from '../components/Spinner/Spinner';
import { GlobalContext } from '../context/GlobalState';

const initEvent = {
  title: '',
  description: '',
  price: 0,
  date: '',
};

const Events = (props) => {
  const { token } = useContext(GlobalContext);
  const [events, setEvents] = useState([]);
  const [state, setState] = useState({
    showModal: false,
    selectedEvent: null,
    newEvent: initEvent,
  });

  const onViewDetails = (id) => {
    const event = events.filter((event) => event._id === id);
    setState({ ...state, selectedEvent: event[0] });
  };

  const handleInputChange = (e) => {
    setState({
      ...state,
      newEvent: {
        ...state.newEvent,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleModalCancel = () =>
    setState({ ...state, showModal: false, selectedEvent: null });

  const handleModalConfirm = async () => {
    try {
      const { title, price, description, date } = state.newEvent;
      if (
        !title.trim().length ||
        !description.trim().length ||
        !date.trim().length ||
        !price
      )
        return;

      const requestBody = {
        query: `
                  mutation CreateEvent($title: String!, $description: String!, $price: Float!, $date: String!) {
                      createEvent(inputEvent: { title: $title, description: $description, price: $price, date: $date }) {
                          _id
                          title
                          description
                          date
                          price
                          creator {
                            _id
                            email
                          }
                      }
                  }
              `,
        variables: {
          title,
          description,
          price: parseFloat(price),
          date,
        },
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

      if (!data.data.createEvent) {
        return console.log('❌', data.errors);
      }

      console.log('✔', data.data);
    } catch (error) {
      return console.log('❌', error);
    }

    setState({
      ...state,
      newEvent: initEvent,
    });
    handleModalCancel();
  };
  const handleBookEvent = async (eventId) => {
    try {
      if (!token) {
        handleModalCancel();
        return;
      }
      const requestBody = {
        query: ` mutation BookEvent($id) {
        bookEvent (eventId: $id) {
          _id
          event {
            _id
            title
            creator {
              email
            }
          }
          user {
            _id
            email
          }
        }
      }`,
      variables: {
        id: eventId
      }
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

      if (!data.data.bookEvent) return console.log('❌', data.errors);

      handleModalCancel();
      console.log('✅', data.data.bookEvent);
    } catch (error) {
      return console.log('❌', error);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const requestBody = {
          query: `query {
                    events {
                        _id
                        title
                        description
                        date
                        price
                        creator {
                          _id
                          email
                        }
                    }
                }
                `,
        };
        const res = await fetch('http://localhost:4000/graphql', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'Application/json',
          },
        });
        const data = await res.json();

        if (!data.data.events) {
          return console.log('❌', data.errors);
        }

        setEvents(data.data.events);
      } catch (error) {
        return console.log('❌', error);
      }
    };
    fetchEvents();
  }, [events]);

  return (
    <div>
      {token && (
        <div className="create-event">
          <h3>Create a new Event</h3>
          <button
            className="btn"
            onClick={() => setState({ ...state, showModal: true })}
          >
            Create an new event
          </button>
        </div>
      )}

      {state.showModal && (
        <Modal
          canCancel={true}
          canConfirm={true}
          onCancel={handleModalCancel}
          onConfirm={handleModalConfirm}
          title="Add Event"
          confirmText="Add"
        >
          <form className="form">
            <div className="form-field">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                onChange={handleInputChange}
                value={state.newEvent.title}
              />
            </div>
            <div className="form-field">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                onChange={handleInputChange}
                value={state.newEvent.price}
              />
            </div>
            <div className="form-field">
              <label htmlFor="date">Date</label>
              <input
                type="datetime-local"
                name="date"
                onChange={handleInputChange}
                value={state.newEvent.date}
              />
            </div>
            <div className="form-field">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                rows="4"
                onChange={handleInputChange}
                value={state.newEvent.description}
              ></textarea>
            </div>
          </form>
        </Modal>
      )}
      {state.selectedEvent && (
        <Modal
          canCancel={true}
          canConfirm={true}
          onCancel={handleModalCancel}
          onConfirm={handleBookEvent.bind(this, state.selectedEvent._id)}
          title="View Details"
          confirmText="Book"
        >
          <h2>{state.selectedEvent.title}</h2>
          <h3>
            {state.selectedEvent.price} -{' '}
            {new Date(state.selectedEvent.date).toLocaleDateString()}
          </h3>
          <p>{state.selectedEvent.description}</p>
        </Modal>
      )}

      {events.length ? (
        <EventsList events={events} onViewDetails={onViewDetails} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Events;
