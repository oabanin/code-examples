import FooterLink from 'src/modules/layout/components/Footer/components/FooterLink/FooterLink';
import FooterSecondaryLink from 'src/modules/layout/components/Footer/components/FooterSecondaryLink/FooterSecondaryLink';
import LogoFooter from 'src/modules/layout/components/Footer/components/LogoFooter/LogoFooter';
import Stores from 'src/modules/layout/components/Footer/components/Stores/Stores';
import {
  corporateData,
  forInvestorsData,
  forPromotersData,
} from 'src/modules/layout/components/Footer/components/linksData';

import Button from 'src/components/Buttons/MuiButton/Button';

import { useComponentPlaceholder } from 'src/hooks/useComponentPlaceholder';

import { useMediaQuery } from '@mui/material';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useInView } from 'react-intersection-observer';

import s from './Footer.module.scss';

const Accordion = dynamic(
  () =>
    import(
      /* webpackPreload: true */ 'src/modules/layout/components/Footer/components/Accordion/Accordion'
    ),
  {
    ssr: false,
  },
);

function ContactUsButton() {
  const t = useTranslations('Layout');
  return (
    <Button onClick={() => Router.push('/contact-us')} variant="outlined" color="primary-2">
      {t('Contact us')}
    </Button>
  );
}

function Footer() {
  const t = useTranslations('Layout');
  const { ref, inView } = useInView({ triggerOnce: true });
  const { isComponentLoaded } = useComponentPlaceholder();
  const isDesktopOrTablet = useMediaQuery('(min-width:768px)');
  return (
    <div ref={ref} className={s.container}>
      <div className="container">
        <div className={s.innerContainer}>
          <div className={s.column}>
            <h4 className={s.title}>{t('For individuals')}</h4>
            <div className={s.links}>
              {forInvestorsData.map((item) => (
                <FooterLink key={item.text} name={t(item.text)} path={item.path} />
              ))}
            </div>
          </div>
          <div className={s.column}>
            <h4 className={s.title}>{t('For companies')}</h4>
            <div className={s.links}>
              {forPromotersData.map((item) => (
                <FooterLink key={item.text} name={t(item.text)} path={item.path} />
              ))}
            </div>
          </div>
          <div className={s.column}>
            <h4 className={s.title}>{t('Corporate')}</h4>
            <div className={s.links}>
              {corporateData.map((item) => (
                <FooterLink key={item.text} name={t(item.text)} path={item.path} />
              ))}
            </div>
          </div>
          <div className={`${s.column} ${s.lastColumn}`}>
            <LogoFooter />
            <div className={s.stores}>
              <Stores inView={isComponentLoaded || inView} />
            </div>
            {isDesktopOrTablet && (
              <div className={s.desktopBtn}>
                <ContactUsButton />
              </div>
            )}
          </div>
        </div>
        {!isDesktopOrTablet && (
          <div className={s.accordionContainer}>
            {(isComponentLoaded || inView) && <Accordion />}
          </div>
        )}
        <div className={s.outerCopyrightContainer}>
          <div className={s.copyrightContainer}>
            <div className={s.copyright}>© {new Date().getFullYear()} invest.com</div>
            <div className={s.copyrightLinks}>
              <FooterSecondaryLink name={t('Privacy')} path="/privacy" />
              <div className={s.divider}>|</div>
              <FooterSecondaryLink name={t('Terms & Conditions')} path="/terms" />
            </div>
          </div>
          {!isDesktopOrTablet && (
            <div className={s.mobileBtn}>
              <ContactUsButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Footer;
