import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem';
import css from '../styles/styles.module.css';

export const ImageGallery = ({ images, handleSelectedImage }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          imageURL={webformatURL}
          largeImageURL={largeImageURL}
          imageTags={tags}
          handleSelectedImage={handleSelectedImage}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  handleSelectedImage: PropTypes.func.isRequired,
};
