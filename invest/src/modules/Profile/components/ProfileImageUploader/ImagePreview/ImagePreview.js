import { MAX_IMAGE_RESOLUTION, MIN_IMAGE_RESOLUTION } from 'src/modules/Profile/constants/image';

import Button from 'src/components/Buttons/MuiButton/Button';

import { checkImageFormat } from 'src/utils/form/image/checkImageFormat';
import { checkImageSize } from 'src/utils/form/image/checkImageSize';
import { getImageFromInputFile } from 'src/utils/form/image/getImageFromInputFile';
import { getImageResolution } from 'src/utils/form/image/getImageResolution';

import cn from 'classnames';
import { useTranslations } from 'next-intl';

import s from './ImagePreview.module.scss';

function ImagePreview({ imgSrc, imgAlt, title, text, buttonText, onClick, error, setError }) {
  const t = useTranslations();

  const checkValidationImage = async () => {
    const image = document.getElementById('file-input').files[0];
    if (!checkImageSize(image)) {
      setError(t('SettingsAccount.maxFileSize'));
      return;
    }

    if (!checkImageFormat(image)) {
      setError(t('SettingsAccount.badFormat'));
      return;
    }

    const resolution = await getImageResolution(image);

    if (!resolution) {
      setError(t('SettingsAccount.imageCorrupted'));
      return;
    }

    if (resolution.width < MIN_IMAGE_RESOLUTION || resolution.height < MIN_IMAGE_RESOLUTION) {
      setError(t('SettingsAccount.tooSmallImage'));
      return;
    }

    if (resolution.width > MAX_IMAGE_RESOLUTION || resolution.height > MAX_IMAGE_RESOLUTION) {
      setError(t('SettingsAccount.tooLargeImage'));
      return;
    }

    try {
      const { default: loadImage } = await import('blueimp-load-image');

      const data = await loadImage(image, {
        orientation: true,
        meta: true,
        canvas: true,
      });

      // const imageParams = await getImageFromInputFile(image);
      const src = data.image.toDataURL();
      const blueImpImageParams = {
        width: data.originalWidth,
        height: data.originalHeight,
        src,
        file: image,
      };

      setError(false);
      onClick(blueImpImageParams);
    } catch (e) {
      setError(t('SettingsAccount.badFormat'));
    }
  };

  return (
    <div className={s.container}>
      <div className={s.imgContainer}>
        <img
          key={imgSrc}
          className={s.img}
          width={300}
          height={300}
          src={imgSrc || '/svg/profile/profile-placeholder.svg'}
          alt={imgAlt}
        />
      </div>
      <div className={s.title}>{title}</div>
      <div className={cn(s.text, { [s.error]: Boolean(error) })}>{error || text}</div>
      <div className={s.buttonContainer}>
        <Button
          onClick={() => document.getElementById('file-input').click()}
          variant="outlined"
          color="primary"
        >
          {buttonText}
        </Button>
        <input
          accept=".jpeg,.jpg,.png"
          id="file-input"
          type="file"
          onChange={checkValidationImage}
        />
      </div>
    </div>
  );
}

export default ImagePreview;
