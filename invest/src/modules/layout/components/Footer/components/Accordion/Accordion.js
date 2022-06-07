import { useState } from 'react';

import FooterLink from 'src/modules/layout/components/Footer/components/FooterLink/FooterLink';
import {
  corporateData,
  forInvestorsData,
  forPromotersData,
} from 'src/modules/layout/components/Footer/components/linksData';

import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { StyledEngineProvider, styled } from '@mui/material/styles';
import { useTranslations } from 'next-intl';
import PropTypes from 'prop-types';
import ArrowDownIcon from 'public/svg/layout/footer/arrow-down.svg';

import s from './Accordion.module.scss';

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
        expandIcon={<ArrowDownIcon className={s.iconAccordionSummary} />}
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

export default function Accordion({ data }) {
  const [expanded, setExpanded] = useState(null);
  const t = useTranslations('Layout');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? +panel : false);
  };

  return (
    <div className={s.container}>
      <AccordionStyled expanded={expanded === 1} onChange={handleChange(1)}>
        <AccordionSummary>{t('For individuals')}</AccordionSummary>
        <AccordionDetails>
          {forInvestorsData.map((item) => (
            <FooterLink key={item.text} name={t(item.text)} path={item.path} />
          ))}
        </AccordionDetails>
      </AccordionStyled>
      <AccordionStyled expanded={expanded === 2} onChange={handleChange(2)}>
        <AccordionSummary>{t('For companies')}</AccordionSummary>
        <AccordionDetails>
          {forPromotersData.map((item) => (
            <FooterLink key={item.text} name={t(item.text)} path={item.path} />
          ))}
        </AccordionDetails>
      </AccordionStyled>
      <AccordionStyled expanded={expanded === 3} onChange={handleChange(3)}>
        <AccordionSummary>{t('Corporate')}</AccordionSummary>
        <AccordionDetails>
          {corporateData.map((item) => (
            <FooterLink key={item.text} name={t(item.text)} path={item.path} />
          ))}
        </AccordionDetails>
      </AccordionStyled>
    </div>
  );
}
