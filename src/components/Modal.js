import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from '../styles/styles.module.css';

const modalRoot = document.querySelector('#modal--root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  handleKeyUp = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      console.log(e.currentTarget);
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.handleOverlayClick}>
        <div className={css.Modal}>
          <img src={this.props.largeImageURL} alt={this.props.imageTags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
