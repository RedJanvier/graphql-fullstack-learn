import React from 'react';

import './Modal.css';

const Modal = (props) => {
  return (
    <div className="modal">
      <div className="modal__header">
        <h3>Create an event</h3>
      </div>
      <div className="modal__content">Create an event here...</div>
      <div className="modal__actions">
        {props.canCancel && (
          <button className="modal__cancel btn" onClick={props.onCancel}>
            Cancel
          </button>
        )}
        {props.canConfirm && (
          <button className="modal__confirm btn" onClick={props.onConfirm}>
            Confirm
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
