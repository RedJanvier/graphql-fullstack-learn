import React, { useState, useContext } from 'react';

import './Events.css';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import { GlobalContext } from '../context/GlobalState';

const initEvent = {
  title: '',
  description: '',
  price: 0,
  date: '',
};

const Events = (props) => {
  const { token } = useContext(GlobalContext);
  const [state, setState] = useState({
    showModal: false,
    newEvent: initEvent,
  });

  const handleInputChange = (e) => {
    setState({
      ...state,
      newEvent: {
        ...state.newEvent,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleModalCancel = () => setState({ ...state, showModal: false });

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
                  mutation {
                      createEvent(inputEvent: { title: "${title}", description: "${description}", price: ${price}, date: "${date}" }) {
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
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!data.data) {
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
      {state.showModal && <Backdrop />}
    </div>
  );
};

export default Events;
