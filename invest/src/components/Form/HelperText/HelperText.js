import FormHelperText from '@mui/material/FormHelperText';
import cn from 'classnames';

import s from './HelperText.module.scss';

function HelperText({ helper, error, id, counter, value, maxLength, ...rest }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: 23,
      }}
      {...rest}
    >
      {error || helper ? (
        <FormHelperText classes={{ root: s.root }}>
          <>{error || helper}</>
        </FormHelperText>
      ) : (
        <div />
      )}
      {counter && (
        <FormHelperText
          classes={{ root: cn(s.root, { [s.withHelper]: Boolean(error) || Boolean(helper) }) }}
        >
          {value?.length || 0} / {maxLength || 0}
        </FormHelperText>
      )}
    </div>
  );
}

export default HelperText;
