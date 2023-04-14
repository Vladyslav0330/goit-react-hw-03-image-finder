import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.escPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.escPress);
  }

  escPress = e => {
    if (e.code === 'Escape') {
      this.props.onClick();
    }
  };

  backdropClickHandler = e => {
    if (e.target === e.currentTarget) {
      this.props.onClick();
    }
  };

  render() {
    return createPortal(
      <div className={css.overlay} onClick={this.backdropClickHandler}>
        <div className={css.modal}>
          <img src={this.props.imageURL} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}


Modal.propTypes = {
  imageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
