import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(4, 'Username should not be less than 3 characters')
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

export const EmailSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is not valid'),
});

export const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password should not be less than 8 characters')
    .max(64, 'Password should not be more than 3 characters'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .min(8, 'Confirm password should not be less than 8 characters')
    .max(64, 'Confirm password should not be more than 3 characters')
    .oneOf([Yup.ref('password'), null], 'Does not match with password'),
});
