import { useEffect } from 'react';

import Button from 'src/components/Buttons/MuiButton/Button';

import { disableScroll, enableScroll } from 'src/utils/disableScroll';

import { Dialog } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import CloseIcon from 'public/svg/components/modal/close.svg';

import s from './CustomDialog.module.scss';

function CustomDialog({
  open,
  onCancel,
  title,
  body,
  onApprove,
  declineBtn,
  approveBtn,
  onCloseModal,
  declineBtnColor = 'secondary',
}) {
  useEffect(() => {
    if (open) {
      setTimeout(() => disableScroll(), 50);
    }
  }, [open]);
  return (
    <StyledEngineProvider injectFirst>
      <Dialog
        BackdropProps={{ style: { backgroundColor: 'rgba(35, 50, 64, 0.6)' } }}
        classes={{ paper: s.paper }}
        open={open}
        onClose={onCloseModal}
        disableScrollLock
      >
        <div className={s.container}>
          <button
            onClick={() => {
              onCloseModal();
              enableScroll();
            }}
            className={s.closeBtn}
          >
            <CloseIcon />
          </button>
          <h2 className={s.title}>{title}</h2>
          <div className={s.text}>{body}</div>
          <div className={s.buttonsContainer}>
            <Button
              onClick={() => {
                onCancel();
                enableScroll();
              }}
              variant="outlined"
              color={declineBtnColor}
            >
              {declineBtn}
            </Button>
            <Button
              onClick={() => {
                onApprove();
                enableScroll();
              }}
              variant="contained"
              color="primary"
            >
              {approveBtn}
            </Button>
          </div>
        </div>
      </Dialog>
    </StyledEngineProvider>
  );
}

export default CustomDialog;
