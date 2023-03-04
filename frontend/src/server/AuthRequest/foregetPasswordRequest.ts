import axios from 'axios';
import config from 'config/index.json';
const { BASE_URL } = config;

const forgetPassword = async (valuse: any, toast: any): Promise<any> => {
  try {
    const { data } = await axios.post(`${BASE_URL}auth/forget-password`, valuse);
    return data;
  } catch (err: any) {
    if (err.response.status === 404) {
      toast({
        title: 'Error',
        description: 'User is not registered with this email',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-left',
      });
    }
  }
};

export default forgetPassword;
