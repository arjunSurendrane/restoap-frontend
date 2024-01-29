import API from '../../utils/axios';

export async function StripeIntegrate() {
  try {
    const response = await API.post('/integration/stripe/accounts');
    return response.data;
  } catch (error) {
    return error;
  }
}
