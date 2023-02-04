import axios from 'axios';
import config from 'config/index.json';

const { BASE_URL } = config;
const shareme = JSON.parse(localStorage.getItem('shareme') || '');

const toastOption = {
  duration: 3000,
  isClosable: true,
  position: 'top-left',
};

export const postRequest = async (values: any, toast: Function, navigate: Function) => {
  try {
    const formData = new FormData();
    for (const value of values.Files) {
      formData.append(value.name, value);
    }

    formData.append('Description', values.Description);
    formData.append('Location', values.Location);

    const res = await axios.post(`${BASE_URL}post/v1/`, formData, {
      headers: {
        Authorization: shareme.access,
      },
    });

    toast({
      ...toastOption,
      title: 'Success',
      description: 'Post successfully created',
      status: 'success',
    });
    navigate('/');
  } catch (err: any) {
    if (err.response.status === 401) {
      //Unautorization
      navigate('/login');
    }
  }
};
