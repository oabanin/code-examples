import React from 'react';

import s from 'src/components/CustomSlider/CustomSlider.module.scss';

import { Slider } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';

function CustomSlider({ value, min, max, step, onChange }) {
  return (
    <StyledEngineProvider injectFirst>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        classes={{
          track: s.track,
          rail: s.rail,
          thumb: s.thumb,
          active: s.active,
          focusVisible: s.focusVisible,
        }}
      />
    </StyledEngineProvider>
  );
}

export default CustomSlider;
