import axios from 'axios';
import config from 'config/index.json';

const { BASE_URL } = config;
const isLikeRequest = async (username: string, postId: string): Promise<any> => {
  try {
    const shareme = localStorage.getItem('shareme');
    const token = shareme ? JSON.parse(shareme) : {};

    const res = await axios.post(
      `${BASE_URL}like/is-like`,
      { username, postId },
      {
        headers: {
          Authorization: `Bearer ${token?.access}`,
        },
      },
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

export default isLikeRequest;
