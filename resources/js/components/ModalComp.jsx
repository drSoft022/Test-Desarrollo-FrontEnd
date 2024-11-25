import React, { useState } from 'react';

const ModalComp = ({ closeModal, title, children }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className='m-2'>{title}</h4>
          <div className='closeModal'>
            <button className="close-btn" onClick={closeModal}><i className="fa-regular fa-circle-xmark"></i></button>
          </div>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalComp;