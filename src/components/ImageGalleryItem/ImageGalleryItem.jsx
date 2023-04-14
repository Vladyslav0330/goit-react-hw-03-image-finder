import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ url, title, largeImage }) => {
  return (
    <li className={css.galleryItem}>
      <img
        src={url}
        alt={title}
        className={css.galleryItemImage}
        data-url={largeImage}
      />
    </li>
  );
};

export default ImageGalleryItem;
ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
