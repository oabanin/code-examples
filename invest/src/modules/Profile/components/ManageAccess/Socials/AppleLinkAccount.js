import React from 'react';

import ConnectButton from 'src/modules/Profile/components/ManageAccess/Socials/ConnectButton/ConnectButton';

import AppleSignin from 'react-apple-signin-auth';

function AppleLinkAccount({ handleSuccess }) {
  return (
    <AppleSignin
      authOptions={{
        clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
        scope: 'email name',
        redirectURI: process.env.NEXT_PUBLIC_SITE_URL,
        state: '',
        nonce: 'nonce',
        usePopup: true,
      }}
      onSuccess={(response) => handleSuccess({ response, social: 'apple' })}
      onError={(error) => console.error(error)}
      render={(renderProps) => (
        <ConnectButton onClick={renderProps.onClick} disabled={renderProps.disabled} />
      )}
    />
  );
}

export default AppleLinkAccount;
