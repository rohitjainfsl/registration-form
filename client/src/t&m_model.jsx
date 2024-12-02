import React from 'react';
import ReactDOM from 'react-dom';
import './model.css';

const Modal = ({ show, onClose, onAgree}) => {
  if (!show) return null; 

  return ReactDOM.createPortal(
    <div className="modal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Terms & Conditions</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <h5>You agree to the following:</h5>
            <ul>
              <li>You have understood the course content.</li>
              <li>You have understood the course duration.</li>
              <li>You have cleared all your doubts regarding the course, the content, and the duration.</li>
              <li>Fees once paid is not refundable.</li>
              <li>In case of uninformed leave, I will not be eligible for a backup.</li>
              <li>7 days or more of leave without prior permission would result in termination of registration.</li>
            </ul>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-success" onClick={onAgree}>I Agree</button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
              </button>
          </div>
        </div>
      </div>
    </div>,
    document.body // Render the modal at the root level
  );
};

export default Modal;
