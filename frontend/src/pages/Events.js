import React, { useState, useContext } from 'react';

import './Events.css';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import { GlobalContext } from '../context/GlobalState';

const Events = (props) => {
  const { token } = useContext(GlobalContext);
  const [state, setState] = useState({ showModal: false });

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
          onCancel={() => setState({ ...state, showModal: false })}
        />
      )}
      {state.showModal && <Backdrop />}
    </div>
  );
};

export default Events;
