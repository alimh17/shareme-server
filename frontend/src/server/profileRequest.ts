import axios from 'axios';
import config from 'config/index.json';

const { BASE_URL } = config;

export const profileRequest = async (pathname: string): Promise<any> => {
  const shareme = localStorage.getItem('shareme');
  const token = shareme ? JSON.parse(shareme) : {};

  try {
    const res = await axios.get(`${BASE_URL}profile/${pathname}`, {
      headers: {
        Authorization: `Bearer ${token?.access}`,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};
