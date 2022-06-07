import s from 'src/modules/Profile/components/ProfileCheckboxRadioButton/ProfileCheckboxRadioButton.module.scss';

import cn from 'classnames';
import CheckboxCheckedIcon from 'public/svg/components/checkbox/checkbox-checked.svg';
import CheckboxUncheckedIcon from 'public/svg/components/checkbox/checkbox-unchecked.svg';
import RadioButtonCheckedIcon from 'public/svg/components/radio-button/radiobutton-checked.svg';
import RadioButtonUncheckedIcon from 'public/svg/components/radio-button/radiobutton-unchecked.svg';

function ProfileCheckboxRadioButton({
  disabled,
  isRadioButton,
  onClick,
  label,
  icon,
  checked,
  value,
  subtitle,
  name,
}) {
  const uncheckedIcon = isRadioButton ? <RadioButtonUncheckedIcon /> : <CheckboxUncheckedIcon />;
  const checkedIcon = isRadioButton ? <RadioButtonCheckedIcon /> : <CheckboxCheckedIcon />;
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={() => onClick({ field: name, value })}
      className={cn(s.container, { [s.withSubtitle]: Boolean(subtitle) })}
    >
      <div className={cn(s.iconContainer, { [s.checked]: checked })}>{icon}</div>
      <div className={cn(s.content, { [s.withSubtitle]: Boolean(subtitle) })}>
        <h3 className={s.label}>{label}</h3>
        {subtitle && <p className={s.subtitle}>{subtitle}</p>}
      </div>
      <div
        className={cn(s.checkboxContainer, {
          [s.checked]: checked,
          [s.withSubtitle]: Boolean(subtitle),
        })}
      >
        {checked ? checkedIcon : uncheckedIcon}
      </div>
    </button>
  );
}

export default ProfileCheckboxRadioButton;
