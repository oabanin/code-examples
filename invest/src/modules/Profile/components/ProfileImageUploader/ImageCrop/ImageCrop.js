import { useCallback, useMemo, useState } from 'react';

import { MIN_IMAGE_RESOLUTION } from 'src/modules/Profile/constants/image';

import Button from 'src/components/Buttons/MuiButton/Button';
import CustomSlider from 'src/components/CustomSlider/CustomSlider';

import { useSnackBar } from 'src/hooks/useSnackBar';

import { useMediaQuery } from '@mui/material';
import { useTranslations } from 'next-intl';
import ZoomMinusIcon from 'public/svg/components/image-crop/zoom-minus.svg';
import ZoomPlusIcon from 'public/svg/components/image-crop/zoom-plus.svg';
import Cropper from 'react-easy-crop';

import s from './ImageCrop.module.scss';

export function ImageCrop({ image, handleCancel, handleConfirm }) {
  const { width, height, src, file } = image;
  const isDesktopOrTablet = useMediaQuery('(min-width:768px)');
  const { enqueueSnackbar } = useSnackBar();
  const t = useTranslations();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({});

  const minZoom = useMemo(() => {
    let minZoom = 1;
    if (width > height) {
      minZoom = width / height;
    } else if (width < height) {
      minZoom = height / width;
    }
    return minZoom;
  }, [image.width, image.height]);

  const maxZoom = useMemo(() => {
    let maxZoom = width / MIN_IMAGE_RESOLUTION;
    if (width > height) {
      maxZoom = height / MIN_IMAGE_RESOLUTION;
    } else if (width < height) {
      maxZoom = width / MIN_IMAGE_RESOLUTION;
    }
    if (maxZoom > 2) {
      maxZoom = 2;
    }
    maxZoom *= minZoom;
    return maxZoom;
  }, [image.width, image.height]);

  const [zoom, setZoom] = useState(minZoom);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  return (
    <div className={s.container}>
      <div className={s.imgContainer}>
        <Cropper
          zoomWithScroll={false}
          image={src}
          cropShape="round"
          showGrid={false}
          crop={crop}
          cropSize={{ width: 300, height: 300 }}
          zoom={zoom}
          maxZoom={maxZoom}
          minZoom={minZoom}
          aspect={height / width}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          classes={{ cropAreaClassName: s.cropArea }}
        />
      </div>
      <div className={s.controls}>
        <button
          onClick={() => setZoom((zoom) => zoom - 0.1)}
          disabled={zoom === minZoom}
          className={s.ctrlBtn}
        >
          <ZoomMinusIcon />
        </button>
        <CustomSlider
          value={zoom}
          min={minZoom}
          max={maxZoom}
          step={0.1}
          onChange={(e, zoom) => setZoom(zoom)}
        />
        <button
          onClick={() => setZoom((zoom) => zoom + 0.1)}
          disabled={zoom === maxZoom}
          className={s.ctrlBtn}
        >
          <ZoomPlusIcon />
        </button>
      </div>
      <div className={s.text}>{t('SettingsAccount.dragImage')}</div>
      <div className={s.buttonsContainer}>
        <Button onClick={handleCancel} variant="outlined" color="secondary">
          {t('Settings.cancel')}
        </Button>
        <Button
          onClick={() => {
            // const croppedChecked = {...croppedAreaPixels};
            // if (croppedAreaPixels.width < MIN_IMAGE_RESOLUTION) {
            //   croppedAreaPixels.width = MIN_IMAGE_RESOLUTION;
            //   croppedAreaPixels.y -= 1;
            // }
            handleConfirm({ croppedAreaPixels, src, file });
            !isDesktopOrTablet && enqueueSnackbar(t('SettingsAccount.imageAdded'));
          }}
          variant="contained"
          color="primary"
        >
          {t('SettingsAccount.apply')}
        </Button>
      </div>
    </div>
  );
}
