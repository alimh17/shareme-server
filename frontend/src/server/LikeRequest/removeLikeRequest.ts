import axios from 'axios';
import config from 'config/index.json';

const { BASE_URL } = config;
const removeLikeRequest = async (username: string, postId: string, owner: string): Promise<any> => {
  try {
    const shareme = localStorage.getItem('shareme');
    const token = shareme ? JSON.parse(shareme) : {};

    const res = await axios.put(
      `${BASE_URL}like/remove-like`,
      { username, postId, owner },
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

export default removeLikeRequest;
