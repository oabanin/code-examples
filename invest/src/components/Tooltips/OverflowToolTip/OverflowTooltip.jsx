import React, { useEffect, useRef, useState } from 'react';

import debounce from 'src/utils/debounce';

import { Tooltip as MUITooltip } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import cn from 'classnames';
import PropTypes from 'prop-types';

import sMain from '../Tooltip/Tooltip.module.scss';
import s from './OverflowTooltip.module.scss';

function reCalc(tooltipElement, setShowTooltip, showTooltip) {
  if (tooltipElement) {
    if (
      tooltipElement.offsetWidth === tooltipElement.scrollWidth &&
      tooltipElement.offsetWidth !== 0
    ) {
      tooltipElement.style.width = `${tooltipElement.offsetWidth + 2}px`;
      setShowTooltip(false);
    }
    if (tooltipElement.offsetWidth < tooltipElement.scrollWidth) {
      setShowTooltip(true);
    }
  }
}

function OverflowTooltip({ noPad, className, children, isShowTooltip, setIsShowTooltip }) {
  const [_showTooltip, _setShowTooltip] = useState(false);
  const tooltipElement = useRef(null);

  const showTooltip = isShowTooltip ?? _showTooltip;
  const setShowTooltip = setIsShowTooltip || _setShowTooltip;

  useEffect(() => {
    if (!tooltipElement) return;
    if (
      tooltipElement.current.offsetWidth === tooltipElement.current.scrollWidth &&
      tooltipElement.current.offsetWidth !== 0
    ) {
      tooltipElement.current.style.width = `${tooltipElement.current.offsetWidth + 2}px`;
    }
    setShowTooltip(
      tooltipElement.current.offsetWidth < tooltipElement.current.scrollWidth && !showTooltip,
    );

    reCalc(tooltipElement.current, setShowTooltip, showTooltip);

    window.addEventListener(
      'resize',
      debounce(() => {
        reCalc(tooltipElement.current, setShowTooltip, showTooltip);
      }, 500),
    );

    return () => {
      window.removeEventListener(
        'resize',
        debounce(() => {
          reCalc(tooltipElement, setShowTooltip, showTooltip);
        }, 500),
      );
    };
  }, [tooltipElement, children]);

  useEffect(() => {
    setTimeout(() => {
      reCalc(tooltipElement.current, setShowTooltip, showTooltip);
    }, 1500);
  }, [children]);

  return (
    <div>
      <StyledEngineProvider injectFirst>
        <MUITooltip
          classes={{ tooltip: sMain.tooltip }}
          title={showTooltip ? children : ''}
          enterTouchDelay={20}
        >
          <p className={cn(s.wrapper, className)} ref={tooltipElement}>
            {children}
          </p>
        </MUITooltip>
      </StyledEngineProvider>
    </div>
  );
}

export default OverflowTooltip;

OverflowTooltip.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
