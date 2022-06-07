import s from 'src/components/Buttons/MuiButton/Button.module.scss';

import cn from 'classnames';
import PropTypes from 'prop-types';

function Button({
  className,
  onClick,
  fullWidth,
  children,
  variant,
  size,
  color,
  disabled,
  href,
  type,
  ...rest
}) {
  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      type={type}
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={cn(className, s.root, s.placeholder, {
        [s.sizeLarge]: size === 'large',
        [s.containedSecondary]: color === 'secondary' && variant === 'contained',
        [s.outlined]: variant === 'outlined',
        [s.outlinedSecondary]: color === 'secondary' && variant === 'outlined',
        [s.outlinedPrimary2]: color === 'primary-2' && variant === 'outlined',
        [s.outlinedSecondaryDanger]: color === 'secondary-danger' && variant === 'outlined',
        [s.fullWidth]: fullWidth,
      })}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Button;

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['contained', 'outlined']),
  color: PropTypes.oneOf(['primary', 'secondary', 'primary-2', 'secondary-danger']),
  onClick: PropTypes.func,
  href: PropTypes.string,
};

Button.defaultProps = {
  color: 'primary',
  variant: 'contained',
  size: 'medium',
};
