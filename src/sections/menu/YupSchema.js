import * as Yup from 'yup';

export const menuValidationSchema = Yup.object({
  name: Yup.string().trim().required('Name is required'),
  shortDescription: Yup.string()
    .trim()
    .required('Short Description is required')
    .max(100, 'Short Description must be at most 150 characters'),
  description: Yup.string()
    .required('Description is required')
    .test('not-empty', 'Description is required', (value) =>
      // Use a regular expression to check if the value contains non-whitespace characters.
      /\S/.test(value)
    )
    .test(
      'not-<p><br></p>',
      'Invalid Description',
      (value) =>
        // Check if the value is exactly '<p><br></p>'.
        value !== '<p><br></p>'
    ),
  store: user.storeId ? '' : Yup.string().required('Store is required'),
  foodCategory: Yup.string().required('Category is required'),
  category: Yup.string().required('Category is required'),
  price: !variant
    ? Yup.string()
        .required('Price is Required')
        .matches(/^[0-9]+$/, 'Price must be number')
    : '',
  variants: variant
    ? Yup.array(
        Yup.object().shape({
          name: Yup.string().required('Name is required'),
          price: Yup.string()
            .required('Price is Required')
            .matches(/^[0-9]+$/, 'Price must be number'),
        })
      )
    : '',
  offer: offers
    ? Yup.array(
        Yup.object().shape({
          offerPercentage: Yup.string()
            .required('Percentage is required')
            .matches(
              /^(\d+(\.\d{0,2})?|\.\d{1,2})$/,
              'Additional charge must be a valid number between 0 and 100'
            )
            .test('is-between-0-100', 'Additional charge must be between 0% and 100%', (value) => {
              if (!value) return true;
              const numericValue = parseFloat(value);
              return numericValue >= 0 && numericValue <= 100;
            }),
          endDate: Yup.date()
            .required('EndDate is Required')
            .min(Yup.ref('startDate'), 'EndDate must be after StartDate')
            .nullable(),
          startDate: Yup.date().required('StartDate is Required').nullable(),
        })
      )
    : '',
  kitchen: Yup.string().required('Kitchen Type is required'),
  preparationTime: Yup.string()
    .required('Preparation Time is Required')
    .matches(/^[0-9]+$/, 'Preparation Time must be number')
    .test('max-min', 'Preparation Time must be between 0 and 60 minutes', (value) => {
      const preparationTimeInMinutes = parseInt(value, 10);
      return preparationTimeInMinutes >= 0 && preparationTimeInMinutes <= 60;
    }),
});
