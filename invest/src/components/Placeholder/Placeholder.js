import s from 'src/components/Placeholder/Placeholder.module.scss';

import Skeleton from '@mui/material/Skeleton';
import cn from 'classnames';
import PropTypes from 'prop-types';

function Placeholder({ className, variant, width, height, bgColor, borderRadius, ...rest }) {
  return (
    <Skeleton
      classes={{ root: cn(className, s.placeholder) }}
      variant={variant}
      width={width}
      height={height}
      sx={{
        bgcolor: bgColor,
        borderRadius: variant === 'circular' ? '50%' : borderRadius,
        ...rest,
      }}
    />
  );
}

export default Placeholder;

Placeholder.propTypes = {
  variant: PropTypes.oneOf(['text', 'circular', 'rectangular']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bgColor: PropTypes.string,
  borderRadius: PropTypes.string,
};

Placeholder.defaultProps = {
  variant: 'rectangular',
  width: '100%',
  height: 40,
  bgColor: '#e7edf0',
  borderRadius: '4px',
};
