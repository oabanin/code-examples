import PropTypes from 'prop-types';

import s from './Preloader.module.scss';

export default function Preloader({ variant }) {
  return (
    <div className={s.container}>
      <img
        style={{ width: '124px', height: '124px' }}
        src={
          variant === 'greyBg'
            ? '/images/preloader/preloader-grey-bg.gif'
            : '/images/preloader/preloader-white-bg.gif'
        }
        alt="Loading, please wait..."
      />
    </div>
  );
}

Preloader.propTypes = {
  variant: PropTypes.oneOf(['whiteBg', 'greyBg']),
};

Preloader.defaultProps = {
  variant: 'greyBg',
};
