import PropTypes from 'prop-types';
import css from '../styles/styles.module.css';

export const LoadMoreBtn = ({ handleLoadMore }) => {
  return (
    <button type="button" className={css.Button} onClick={handleLoadMore}>
      Load more
    </button>
  );
};

LoadMoreBtn.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};
