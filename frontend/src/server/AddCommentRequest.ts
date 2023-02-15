import axios from 'axios';
import config from 'config/index.json';

const { BASE_URL } = config;

const addCommentRequest = async (post: any): Promise<any> => {
  try {
    const shareme = localStorage.getItem('shareme');
    const token = shareme ? JSON.parse(shareme) : {};

    const res = await axios.post(`${BASE_URL}comment/add-comment`, post, {
      headers: {
        Authorization: `Bearer ${token?.access}`,
      },
    });

    return res;
  } catch (err) {
    console.log(err);
  }
};

export default addCommentRequest;
