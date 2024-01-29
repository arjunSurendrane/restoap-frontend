import API from '../../utils/axios';

export async function handleErrorResponse(error, reset, defaultValue, setError, setErrorMessage) {
  reset(defaultValue);
  setError('afterSubmit', {
    ...error,
    message: error.message, // Optionally, include a more detailed message or use the existing error.message
  });
  const { response } = error;
  let errorMsg;
  if (response.status === 500) {
    errorMsg = `Please try again later or contact our support team for assistance.`;
  } else {
    errorMsg = response?.data?.message;
  }
  setErrorMessage(errorMsg);

  // Automatically clear the error message after a certain period
  setTimeout(() => {
    setErrorMessage('');
  }, 5000); // Adjust the timeout value as needed
}

export const forgotPassword = async (data, setOpen, setOpenModal, reset, setError) => {
  try {
    const res = await API.post('/auth/forgot-password', {
      email: data.email,
    });
    if (res.status === 204) {
      console.log('enter in ');
      setOpen(true);
      setOpenModal(false);
    }
  } catch (error) {
    reset();
    console.log({ error })
    if (error.response.data.message) {
      setError(error.response.data.message)
    } else {
      setError('something gone wrong')
    }
    setTimeout(() => setError(''), 3000)
  }
};

export const verifyEmailUsingToken = async (
  token,
  verifyToken,
  setSuccessVerification,
  searchParams,
  setSearchParams,
  setErrorMessage
) => {
  try {
    console.log('tokens', token);
    const responseData = await verifyToken(token);
    console.log({ responseData });
    setSuccessVerification(responseData?.message || 'successfully verified');
    searchParams.delete('token');
    setSearchParams(searchParams);
  } catch (error) {
    setErrorMessage(error?.response?.data?.message || 'Your session has expired. Please log in to continue.');
    searchParams.delete('token');
    setSearchParams(searchParams);
  }
};
