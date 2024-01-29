import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { Helmet } from 'react-helmet-async';
// sections
import Login from '../../sections/auth/Login';
import API from '../../utils/axios';

// import Login from '../../sections/auth/LoginAuth0';

// ----------------------------------------------------------------------

export default function LoginPage() {
  const params = useParams();
  console.log('params', params.token);
  const [validUrl, setValidUrl] = useState(true);

  return (
    <>
      <Helmet>
        <title> Login | RestoAp</title>
      </Helmet>

      <Login />
    </>
  );
}
