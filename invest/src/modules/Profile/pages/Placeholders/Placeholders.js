import sImagePreview from 'src/modules/Profile/components/ProfileImageUploader/ImagePreview/ImagePreview.module.scss';

import Placeholder from 'src/components/Placeholder/Placeholder';

import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';

import s from './Placeholders.module.scss';

// Header Placeholders
export function HeaderMenuPlaceholder() {
  return (
    <>
      <Placeholder className={s.headerMenuPlaceholder} width="35.09px" height={12} />
      <Placeholder className={s.headerMenuPlaceholder} width="37.99px" height={12} />
      <Placeholder className={s.headerMenuPlaceholder} width="50.32px" height={12} />
      <Placeholder className={s.headerMenuPlaceholder} width="41.73px" height={12} />
      <Placeholder className={s.headerMenuPlaceholder} width="30.45px" height={12} />
      <Placeholder className={s.headerMenuPlaceholder} width="51.18px" height={12} />
      <Placeholder className={s.headerMenuPlaceholder} width="62.69px" height={12} />
      <Placeholder className={s.headerMenuPlaceholder} width="54.6px" height={12} />
      <Placeholder className={s.headerMenuPlaceholder} width="65px" height={12} />
    </>
  );
}

export function HeaderPromoteIconPlaceholder() {
  return (
    <Box className={s.headerPromoteIconPlaceholder}>
      <Placeholder variant="circular" width={21} height={21} />
    </Box>
  );
}

export function HeaderProfiilePlaceholder() {
  return <Placeholder width={156} height={36} borderRadius="18px" marginLeft="24px" />;
}

// Common Placeholders
export function CheckboxRadioButtonPlaceholder({
  className,
  width,
  height,
  padding,
  notifications,
  ...props
}) {
  return (
    <Box
      className={s.CheckboxRadioButtonPlaceholderWrapper}
      sx={{
        height,
        padding,
      }}
    >
      {!notifications && <Placeholder height={1} marginBottom="19px" />}
      <Box
        className={s.CheckboxRadioButtonPlaceholderContent}
        sx={{ padding: notifications && '0 !important' }}
      >
        <Placeholder
          width={!notifications ? 40 : 18}
          height={!notifications ? 40 : 18}
          variant="circular"
          marginRight={!notifications ? '20px' : '19px'}
        />
        <Box className={className} width={notifications && width} sx={{ ...props }}>
          <Placeholder width={width || 120} height={12} />
        </Box>
        {!notifications && <Placeholder width={18} height={18} variant="circular" />}
      </Box>
      {!notifications && <Placeholder height={1} marginTop="19px" />}
    </Box>
  );
}

export function ButtonsContainerPlaceholder() {
  return (
    <Box className={s.ButtonsContainerPlaceholder}>
      <Placeholder />
      <Placeholder />
    </Box>
  );
}

// My Preferences > Risk
export function RiskRangeSelectPlaceholder({ hide }) {
  return (
    <Box className={s.riskRangeSelect}>
      <Placeholder height={48} />
      {!hide && <Placeholder height={48} />}
    </Box>
  );
}

// My Preferences > InvestmentInterests
export function RiskRangeButtonsPlaceholder() {
  return (
    <Box className={s.riskRangeButtonsPlaceholder}>
      <Placeholder width={160} />
      <Placeholder width={160} marginLeft="16px" />
    </Box>
  );
}

// Account
export function AccountImagePreviewPlaceholder({ text, title }) {
  return (
    <Box
      sx={{
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Placeholder variant="circular" width={300} height={300} />
      <div className={sImagePreview.title}>{title}</div>
      <div className={sImagePreview.text}>{text}</div>
      <Placeholder width={170} height={32} marginTop="16px" />
    </Box>
  );
}

export function AccountMobileImageButtonPlaceholder({ marginLeft }) {
  return (
    <Box className={s.accountMobileImageButtonPlaceholder} sx={{ marginLeft }}>
      <Placeholder height="100%" className={s.accountMobileImageButtonWrapperLinePlaceholder} />
      <Placeholder variant="circular" width={32} height={32} flex="0 0 32px" marginRight="7px" />
      <Placeholder width={82} height={12} flex="0 0 82px" />
    </Box>
  );
}

export function AccountTypePlaceholder() {
  return (
    <Box className={s.acccountTypePlaceholder}>
      <Placeholder width="65.677px" height={12} />
      <Placeholder variant="circular" width={24} height={24} marginRight="9px" marginLeft="16px" />
    </Box>
  );
}

export function AccountInputPlaceholder({ height, width }) {
  return (
    <Box sx={{ height: height || '71px' }}>
      <Placeholder width={width} height={48} />
    </Box>
  );
}

export function AccountCheckboxPlaceholder({ height }) {
  return (
    <Box sx={{ display: 'flex', height: height || '30px', paddingLeft: '3px' }}>
      <Placeholder variant="circular" width={18} height={18} flex="0 0 18px" />
      <Placeholder height={17} marginLeft="19px" />
    </Box>
  );
}

// Manage Access
export function ManageAccessInputPlaceholder({
  boxWidth,
  boxHeight,
  inputWidth,
  inputHeight,
  sameHeight,
  ...props
}) {
  return (
    <Box sx={{ width: boxWidth, height: sameHeight || boxHeight, ...props }}>
      <Placeholder width={inputWidth} height={sameHeight || inputHeight} />
    </Box>
  );
}

export function ManageAccessEmailTextPlaceholder() {
  const isDesktopOrTablet = useMediaQuery('(min-width:768px)');
  const isDesktopOrTabletMax = useMediaQuery('(max-width:946px)');

  return (
    <Box sx={{ height: !isDesktopOrTabletMax ? '32px' : '48px' }}>
      <Placeholder height={10} marginBottom="6px" />
      <Placeholder height={10} marginBottom="6px" />
      {isDesktopOrTabletMax && (
        <Box sx={{ maxWidth: isDesktopOrTablet ? '300px' : '100%' }}>
          <Placeholder height={10} />
        </Box>
      )}
    </Box>
  );
}

export function ManageAccessTextPlaceholder({ height, maxWidth, hideLastPlaceholder, addLine }) {
  return (
    <Box sx={{ height }}>
      <Placeholder height={10} marginBottom="6px" />
      <Placeholder height={10} marginBottom="6px" />
      {!hideLastPlaceholder && (
        <Box sx={{ maxWidth: maxWidth ? '300px' : '100%', marginBottom: addLine && '6px' }}>
          <Placeholder height={10} />
        </Box>
      )}
      {addLine && <Placeholder height={10} />}
    </Box>
  );
}

export function ManageAccessSocialPlaceholder({ hideBorderBottom }) {
  return (
    <Box className={`${s.manageAccessSocialPlaceholder} ${hideBorderBottom && s.hideBorderBottom}`}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Placeholder variant="circular" width={24} height={24} />
        <Placeholder width={120} height={12} marginLeft="10px" />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ paddingRight: '8px' }}>
          <Placeholder width={70} height={32} />
        </Box>
      </Box>
    </Box>
  );
}
