import axios from 'axios';
import { BASE_URL } from 'config/index.json';

const maybeYouKnow = async () => {
  const shareme = localStorage.getItem('shareme');
  const token = shareme ? JSON.parse(shareme) : {};

  try {
    const res = await axios.get(`${BASE_URL}myk`, {
      headers: {
        Authorization: `Bearer ${token?.access}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default maybeYouKnow;
