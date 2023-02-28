import axios from 'axios';
import config from 'config/index.json';

const { BASE_URL } = config;

const toastOption = {};

const deletePostRequest = async (id: string, toast: any): Promise<any> => {
  try {
    const shareme = localStorage.getItem('shareme');
    const token = shareme ? JSON.parse(shareme) : {};

    const res = await axios.put(
      `${BASE_URL}post`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token?.access}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return res;
  } catch (err: any) {
    return err;
  }
};

export default deletePostRequest;
