/* eslint-disable func-names */
import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .test('no-spaces', 'Spaces are not allowed', (value) => !value.includes(' ')),
  lastName: Yup.string()
    .required('Last name is required')
    .test('no-spaces', 'Spaces are not allowed', (value) => !value.includes(' ')),
  email: Yup.string()
    .required('Email is required')
    .email('Email must be a valid email address')
    .test('no-spaces', 'Spaces are not allowed', (value) => !value.includes(' ')),
  phone: Yup.string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Invalid mobile number')
    .test('no-spaces', 'Spaces are not allowed', (value) => !value.includes(' ')),
  password: Yup.string()
    .required('Password is required')
    .test('no-spaces', 'Spaces are not allowed', (value) => !value.includes(' '))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
      'include at least one capital letter, special character, and number.'
    ),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .test('passwords-match', 'Passwords must match', function (value) {
      return value === this.parent.password;
    }),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
});
export const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  password: Yup.string().required('Password is required'),
});
