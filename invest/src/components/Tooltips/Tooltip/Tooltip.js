import s from 'src/components/Tooltips/Tooltip/Tooltip.module.scss';

import { Tooltip as MUITooltip } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';

function CustomTooltip({ children, title }) {
  return (
    <StyledEngineProvider injectFirst>
      <MUITooltip classes={{ tooltip: s.tooltip }} title={title}>
        <div>{children}</div>
      </MUITooltip>
    </StyledEngineProvider>
  );
}

export default CustomTooltip;
