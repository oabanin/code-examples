import React, { useState } from 'react';

import s from 'src/modules/Profile/components/InvestmestsInterests/Accordion/AccordionInvestmentsInterests.module.scss';

import CustomCheckbox from 'src/components/Form/CustomCheckbox/CustomCheckbox';

import { useMediaQuery } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { StyledEngineProvider, styled } from '@mui/material/styles';
import cn from 'classnames';
import { useTranslations } from 'next-intl';
import ArrowDownIcon from 'public/svg/components/accordion/arrow-down.svg';

function AccordionStyled({ children, onChange, expanded, ...rest }) {
  return (
    <StyledEngineProvider injectFirst>
      <MuiAccordion
        classes={{
          root: s.rootAccordion,
        }}
        expanded={expanded}
        onChange={onChange}
        disableGutters
        elevation={0}
        square
        {...rest}
      >
        {children}
      </MuiAccordion>
    </StyledEngineProvider>
  );
}

function AccordionSummary({ children, ...rest }) {
  return (
    <StyledEngineProvider injectFirst>
      <MuiAccordionSummary
        classes={{
          root: s.rootAccordionSummary,
          expanded: s.expandedAccordionSummary,
          content: s.rootAccordionSummaryContent,
        }}
        {...rest}
      >
        {children}
      </MuiAccordionSummary>
    </StyledEngineProvider>
  );
}

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  border: '0',
  fontFamily: 'var(--text-font-family-primary)',
}));

export default function AccordionInvestmentsInterests({
  disabled,
  formInvestmentsDataArray,
  handleCheckbox,
  setFieldTouched,
  values,
  setFieldValue,
}) {
  const [expanded, setExpanded] = useState('commodities');
  const t = useTranslations();
  const isDesktopOrTablet = useMediaQuery('(min-width:768px)');
  const handlePanelChange = (panel) => (event, newExpanded) => {
    if (event.target.type === 'checkbox') {
      setExpanded(newExpanded ? panel : false);
      return;
    }
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className={s.container}>
      {formInvestmentsDataArray.map((itemCategory) => {
        const panelValue = itemCategory[0];
        const panelLabel = itemCategory[1].label;
        const panelIcon = itemCategory[1].icon;
        const isExpanded = expanded === panelValue;
        const checkBoxData = itemCategory[1].data || [];

        return (
          <AccordionStyled
            key={panelLabel}
            expanded={isExpanded}
            onChange={handlePanelChange(panelValue)}
          >
            <AccordionSummary>
              <div className={s.left}>
                <div className={cn(s.icon, { [s.checked]: values[panelValue]?.length > 0 })}>
                  {panelIcon}
                </div>
                <div className={s.label}>{t(panelLabel)}</div>
              </div>
              <div className={s.right}>
                <button type="button" className={s.buttonArrowDown}>
                  <ArrowDownIcon className={cn(s.iconArrow, { [s.expanded]: isExpanded })} />
                </button>
                <div>
                  <CustomCheckbox
                    disabled={disabled}
                    value="checkAll"
                    className={s.rootCheckboxAll}
                    onChange={(e) => {
                      let newValues;
                      if (e.target.checked) {
                        newValues = checkBoxData.map((item) => item.value);
                      } else {
                        newValues = [];
                      }
                      setFieldValue(panelValue, newValues);
                      setFieldTouched(panelValue, true, false);
                    }}
                    checked={
                      values[panelValue]?.length > 0 &&
                      checkBoxData.length === values[panelValue].length
                    }
                    partiallyChecked={
                      values[panelValue]?.length > 0 &&
                      checkBoxData.length > values[panelValue].length
                    }
                  />
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className={s.table}>
                {checkBoxData.map((itemSubcategory) => {
                  const checkBoxLabel = itemSubcategory.label;
                  const checkBoxValue = itemSubcategory.value;
                  const currentItemChecked = values[panelValue].includes(checkBoxValue);
                  return (
                    <div key={checkBoxLabel} className={s.checkbox}>
                      <CustomCheckbox
                        disabled={disabled}
                        tooltip={isDesktopOrTablet}
                        value={checkBoxValue}
                        className={s.checkBoxRoot}
                        key={checkBoxLabel}
                        label={t(checkBoxLabel)}
                        name={panelValue}
                        onChange={handleCheckbox}
                        checked={currentItemChecked}
                      />
                    </div>
                  );
                })}
              </div>
            </AccordionDetails>
          </AccordionStyled>
        );
      })}
    </div>
  );
}
