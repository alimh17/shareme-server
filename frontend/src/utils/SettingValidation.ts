import * as Yup from 'yup';

const SettingSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name should not be less than 3 characters')
    .max(32, 'Name should not be more than 32 characters'),
  lastname: Yup.string()
    .min(3, 'Lastname should not be less than 3 characters')
    .max(32, 'Lastname should not be more than 32 characters'),
  bio: Yup.string()
    .min(10, 'Bio should not be less than 10 characters')
    .max(500, 'Bio should not be more than 500 characters'),
});

export default SettingSchema;
