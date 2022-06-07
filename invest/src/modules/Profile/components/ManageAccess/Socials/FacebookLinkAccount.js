import React from 'react';

import ConnectButton from 'src/modules/Profile/components/ManageAccess/Socials/ConnectButton/ConnectButton';

import FacebookLogin from '@greatsumini/react-facebook-login';

function FacebookLinkAccount({ handleSuccess }) {
  return (
    <FacebookLogin
      appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
      fields="name,email,picture"
      responseType="token"
      onSuccess={(response) => handleSuccess({ response, social: 'facebook' })}
      onFail={(error) => {
        console.log('Login Failed!', error);
      }}
      redirect_uri={process.env.NEXT_PUBLIC_SITE_URL}
      redirectUri={process.env.NEXT_PUBLIC_SITE_URL}
      render={(renderProps) => (
        <ConnectButton onClick={renderProps.onClick} disabled={renderProps.disabled} />
      )}
    />
  );
}

export default FacebookLinkAccount;
