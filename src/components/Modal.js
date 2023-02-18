import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from '../styles/styles.module.css';

const modalRoot = document.querySelector('#modal--root');

export const Modal = ({ largeImageURL, imageTags, onClose }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyUp = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyUp]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleOverlayClick}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={imageTags} />
      </div>
    </div>,
    modalRoot
  );
};
