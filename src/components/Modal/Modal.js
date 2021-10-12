import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ children, onClose }) {
  useEffect(() => {
    //Добавляет слушателей
    window.addEventListener('keydown', handleKeyDown);

    //Снимает слушателей
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  // Наблюдает за Escape и закрывает модалку
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  // Наблюдает за бекдропом и закрывает модалку
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <div>{children}</div>
    </Overlay>,
    modalRoot,
  );
}

Modal.defaultProps = {
  children: null,
};

Modal.propTypes = {
  image: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};
