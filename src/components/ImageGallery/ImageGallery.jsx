import { Component } from 'react';
import PropTypes from 'prop-types';
import {Modal} from '../Modal/Modal';
import css from './ImageGallery.module.css';
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    showModal: false,
    largeImageURL: '',
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  clickHandler = e => {
    if (e.target === e.currentTarget) {
      return;
    }
    const imageURL = e.target.getAttribute('data-url');
    this.setState({ largeImageURL: imageURL });
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const { showModal, largeImageURL, error } = this.state;
    const { searchResult } = this.props;
    return (
      <>
        {error && <h1>{error.message}</h1>}
        <ul className={css.imageGallery} onClick={this.clickHandler}>
          {searchResult.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              url={webformatURL}
              title={tags}
              largeImage={largeImageURL}
            />
          ))}
        </ul>
        {showModal && (
          <Modal imageURL={largeImageURL} onClick={this.closeModal} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchResult: PropTypes.arrayOf(PropTypes.object).isRequired,
};
