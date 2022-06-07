import Popper from '@mui/material/Popper';
import { styled } from '@mui/material/styles';

const StyledPopper = styled(Popper)({
  '&': {
    '.MuiAutocomplete-paper': {
      fontFamily: 'var(--text-font-family-primary)',
      color: 'var(--color-text)',
      boxShadow: '0px 4px 10px 0px #41596A5C',
      '.MuiAutocomplete-option': {
        paddingTop: 8,
        paddingBottom: 8,
        '&:hover': {
          background: 'var(--color-secondary-opacity-10) !important',
        },

        '&[aria-selected="true"]': {
          color: 'var(--color-primary)',
          background: '#FFFFFF !important',
          '&:hover': {
            background: 'var(--color-secondary-opacity-10) !important',
          },
        },
        // '&.Mui-focused': {
        //   background: 'red',
        // },
      },
    },
  },
});

export default StyledPopper;
