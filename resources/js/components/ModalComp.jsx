import React, { useCallback } from 'react';

const ModalComp = ({ closeModal, title, children }) => {
  const handleOverlayClick = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-container" onClick={handleContentClick}>
        <div className="modal-header">
          <h4 id="modal-title" className="m-2">{title}</h4>
          <button className="close-btn" onClick={closeModal} aria-label="Close modal">
            <i className="fa-regular fa-circle-xmark"></i>
          </button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalComp;