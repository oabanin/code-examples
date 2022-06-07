import React from 'react';

import { styled } from '@mui/material/styles';

const Div = styled('div')`
  min-height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function AppAutocompleteLoadingText(props) {
  return <Div {...props}>Loading</Div>;
}

export default AppAutocompleteLoadingText;
