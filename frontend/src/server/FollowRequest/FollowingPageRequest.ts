import axios from 'axios';
import config from 'config/index.json';

const { BASE_URL } = config;

const followingPageRequest = async () => {
  try {
    const shareme = localStorage.getItem('shareme');
    const token = shareme ? JSON.parse(shareme) : {};

    const res = await axios.get(`${BASE_URL}following-page`, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default followingPageRequest;
