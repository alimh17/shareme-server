import axios from 'axios';
import config from 'config/index.json';

const { BASE_URL } = config;

const deleteCommentRequest = async (post: object) => {
  try {
    const shareme = localStorage.getItem('shareme');
    const token = shareme ? JSON.parse(shareme) : {};

    const res = await axios.post(`${BASE_URL}comment/delete-comment`, post, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });
    console.log(res);

    return res;
  } catch (err) {
    console.log(err);
  }
};

export default deleteCommentRequest;
