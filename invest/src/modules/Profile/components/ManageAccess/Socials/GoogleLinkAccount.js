import React from 'react';

import ConnectButton from 'src/modules/Profile/components/ManageAccess/Socials/ConnectButton/ConnectButton';

import GoogleLogin from 'react-google-login';

function GoogleLinkAccount({ handleSuccess }) {
  return (
    <GoogleLogin
      uxMode="popup"
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
      // accessType="offline"
      // responseType="code"
      cookiePolicy="single_host_origin"
      redirectUri={process.env.NEXT_PUBLIC_SITE_URL}
      onSuccess={(response) => handleSuccess({ response, social: 'google' })}
      onFailure={(e) => console.log(e)}
      render={(renderProps) => (
        <ConnectButton onClick={renderProps.onClick} disabled={renderProps.disabled} />
      )}
    />
  );
}

export default GoogleLinkAccount;
