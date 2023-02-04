import * as Yup from 'yup';

export const postSchema = Yup.object().shape({
  Description: Yup.string()
    .required('Description field required')
    .min(32, 'Capton Must contain at least 32 characters'),
});

export const validationPost = async (data: any, toast: any) => {
  try {
    const valid = await postSchema.validate(data);
    return valid;
  } catch (err: any) {
    toast({});
    toast({
      title: 'Error',
      description: err.message,
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'top-left',
    });
  }
};
