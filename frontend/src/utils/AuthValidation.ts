import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username should not be less than 3 characters')
    .max(64, 'Username should not be more than 3 characters'),
  email: Yup.string().required('Email is required').email('Email is not valid'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password should not be less than 8 characters')
    .max(64, 'Password should not be more than 3 characters'),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is not valid'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password should not be less than 8 characters')
    .max(64, 'Password should not be more than 3 characters'),
});
