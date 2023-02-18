import PropTypes from 'prop-types';
import css from '../styles/styles.module.css';
export const ImageGalleryItem = ({
  imageURL,
  largeImageURL,
  imageTags,
  handleSelectedImage,
}) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={imageURL}
        alt={imageTags}
        onClick={() => {
          handleSelectedImage(largeImageURL, imageTags);
        }}
        className={css.image}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imageURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  imageTags: PropTypes.string.isRequired,
  handleSelectedImage: PropTypes.func.isRequired,
};
