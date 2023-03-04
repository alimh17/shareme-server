import axios from 'axios';
import config from 'config/index.json';

const { BASE_URL } = config;

const toastOption = {
  duration: 3000,
  isClosable: true,
  position: 'top-left',
};

export const postRequest = async (values: any, toast: Function, navigate: Function) => {
  try {
    const shareme = localStorage.getItem('shareme');
    const token = shareme ? JSON.parse(shareme) : {};
    const formData = new FormData();
    for (const value of values.Files) {
      formData.append(value.name, value);
    }

    formData.append('Description', values.Description);
    formData.append('Location', values.Location);

    const res = await axios.post(`${BASE_URL}post`, formData, {
      headers: {
        Authorization: `Bearer ${token?.access}`,
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
    console.log(err);
    if (err.response.status === 401) {
      //Unautorization
      navigate('/login');
    }
  }
};
