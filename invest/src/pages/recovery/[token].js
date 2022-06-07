import { useEffect } from 'react';

import CreatePasswordPage from 'src/modules/Auth/pages/CreatePassword/CreatePasswordPage';

import { useSnackBar } from 'src/hooks/useSnackBar';

import pick from 'lodash/pick';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';

function CreatePassword({ actionToken, invalidToken }) {
  const t = useTranslations('CreatePassword');
  const router = useRouter();
  const { enqueueSnackbar } = useSnackBar();

  useEffect(() => {
    if (invalidToken) {
      router.push('/');
      enqueueSnackbar(t('invalidToken'));
    }
  }, [invalidToken]);

  return (
    <>
      <Head>
        <title>{t('Create password')} - Invest.com</title>
        <meta name="title" content={t('Create password')} />
        <meta name="description" content={t('Create password')} />
      </Head>
      {!invalidToken && <CreatePasswordPage actionToken={actionToken} />}
    </>
  );
}

export default CreatePassword;

CreatePassword.messages = ['Layout', 'CreatePassword', 'Auth'];

export async function getServerSideProps(props) {
  const { locale, params } = props;
  const returnProps = {
    actionToken: params.token,
    messages: pick((await import(`../../intl/${locale}.js`)).default, CreatePassword.messages),
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/password-change/verify`,
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Action-Token': params.token,
        }),
      },
    );

    if (response.status === 204) {
      return {
        props: returnProps,
      };
    }

    returnProps.invalidToken = true;
    return {
      props: returnProps,
    };
  } catch (error) {
    returnProps.invalidToken = true;
    return {
      props: returnProps,
    };
  }
}
