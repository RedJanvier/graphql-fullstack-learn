import React from 'react';

import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';

const Modal = (props) => {
  return (
    <>
      <div className="modal">
        <div className="modal__header">
          <h3>{props.title}</h3>
        </div>
        <div className="modal__content">{props.children}</div>
        <div className="modal__actions">
          {props.canCancel && (
            <button className="modal__cancel btn" onClick={props.onCancel}>
              Cancel
            </button>
          )}
          {props.canConfirm && (
            <button className="modal__confirm btn" onClick={props.onConfirm}>
              {props.confirmText}
            </button>
          )}
        </div>
      </div>
      <Backdrop />
    </>
  );
};

export default Modal;
