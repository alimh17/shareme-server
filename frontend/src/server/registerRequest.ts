import axios from 'axios';
import config from 'config/index.json';

const toastOption = {
  duration: 3000,
  isClosable: true,
  position: 'top-left',
};

const { BASE_URL } = config;
export const registerRequest = async (values: any, file: any, toast: any) => {
  try {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append('file', file);
    const { data } = await axios.post(`${BASE_URL}auth/register`, formData);
    if (data) {
      toast({
        ...toastOption,
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
      });
    }
    return data;
  } catch (err: any) {
    if (err.response.status === 401) {
      toast({
        ...toastOption,
        description: err.response.data.message,
        status: 'error',
      });
    }
    if (err.response.status === 409) {
      toast({
        ...toastOption,
        description: 'Please select a profile picture',
        status: 'error',
      });
    }
  }
};
