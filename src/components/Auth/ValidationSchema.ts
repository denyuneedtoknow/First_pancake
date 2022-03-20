import * as yup from 'yup';
import { setLocale } from 'yup';

setLocale({
  string: {
    // eslint-disable-next-line no-template-curly-in-string
    min: 'Password must be at least ${min} symbols',
  },
});

const validationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required()
    .matches(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/, 'It can`t be your real name'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required!!!').min(12),
  repeatedPassword: yup
    .string()
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
});
export default validationSchema;
