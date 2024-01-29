import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { Helmet } from 'react-helmet-async';
// sections
import Login from '../../sections/auth/Login';
import API from '../../utils/axios';

// import Login from '../../sections/auth/LoginAuth0';

// ----------------------------------------------------------------------

export default function InitialLoginPage() {
  const params = useParams();
  const [validUrl, setValidUrl] = useState(true);
  useEffect(() => {
    const verifyToken = async () => {
      try {
        console.log('tokens', params.token);
        const response = await API.post(
          `/auth/verify-email?token=${params.token}`
          // {
          // params: {
          //   token: params.token,
          // },
          // }
        );
        console.log('response', response);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyToken();
  }, [params]);
  return (
    <>
      <Helmet>
        <title> Initial Login | Minimal UI</title>
      </Helmet>

      <Login />
    </>
  );
}
