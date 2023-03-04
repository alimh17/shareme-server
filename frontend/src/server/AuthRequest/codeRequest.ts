import axios from 'axios';
import config from 'config/index.json';
const { BASE_URL } = config;

const codeRequest = async (code: string, email: string, toast: any): Promise<any> => {
  try {
    const { data } = await axios.post(`${BASE_URL}auth/code`, { code, email });
    delete data.password;
    localStorage.setItem('shareme', JSON.stringify(data));
    toast({
      title: 'Success',
      description: 'Register was successful',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-center',
    });
    return data;
  } catch (err: any) {
    if (err.response.status === 404) {
      toast({
        title: 'Error',
        description: 'Your code is not correct',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-left',
      });
    }
  }
};

export default codeRequest;
