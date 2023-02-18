import { Audio } from 'react-loader-spinner';
import css from '../styles/styles.module.css';

export const Loader = () => {
  return (
    <div className={css.Loader}>
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
};
