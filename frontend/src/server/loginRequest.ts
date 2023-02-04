import axios from 'axios';
import config from 'config/index.json';

const { BASE_URL } = config;

export const loginRequest = async (values: any, toast: any) => {
  try {
    const res = await axios.post(`${BASE_URL}auth/v1/login`, values);
    if (res.data) {
      const cpData = { ...res.data };
      delete cpData.password;
      localStorage.setItem('shareme', JSON.stringify(cpData));
      toast({
        title: 'Success',
        description: 'Login was successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-center',
      });
    }
    return res;
  } catch (err: any) {
    if (err.response.status === 404) {
      toast({
        title: 'Error',
        description: 'There is no user with this profile',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-left',
      });
    }
    return err;
  }
};
