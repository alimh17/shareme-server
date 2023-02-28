import axios from 'axios';

import config from 'config/index.json';
const { BASE_URL } = config;

const getUserPostsRequest = async (page: number, username: string): Promise<any> => {
  const shareme = localStorage.getItem('shareme');
  const token = shareme ? JSON.parse(shareme) : {};
  try {
    const res = await axios.post(
      `${BASE_URL}post/user-posts`,
      { username },
      {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
        params: { page: page, pageSize: 4 },
      },
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default getUserPostsRequest;
