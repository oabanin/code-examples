import s from 'src/components/Form/Input/InputPlaceholder.module.scss';

import cn from 'classnames';

function InputPlaceholder({ label, counter, maxLength, helper, startAdornment, endAdornment }) {
  return (
    <>
      <div className={cn(s.input, { [s.withStartAdornment]: Boolean(startAdornment) })}>
        {label}
        {startAdornment && <div className={s.startAdornment}>{startAdornment}</div>}
        {endAdornment && <div className={s.endAdornment}>{endAdornment}</div>}
      </div>
      <div className={s.helperPlaceholder}>
        {helper && <div className={s.helper}>{helper}</div>}
      </div>
    </>
  );
}

export default InputPlaceholder;
