import axios from 'axios';
import config from 'config/index.json';

const { BASE_URL } = config;

const refreshTokenRequest = async (): Promise<any> => {
  const shareme = localStorage.getItem('shareme');
  const token = shareme ? JSON.parse(shareme) : {};

  try {
    const res = await axios.get(`${BASE_URL}refresh`, {
      headers: {
        Authorization: `Bearer ${token?.refresh}`,
      },
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default refreshTokenRequest;
