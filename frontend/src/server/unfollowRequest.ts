import axios from 'axios';
import config from 'config/index.json';

const { BASE_URL } = config;

export const unfollowRequest = async (data: any) => {
  const shareme = localStorage.getItem('shareme');
  const token = shareme ? JSON.parse(shareme) : {};

  try {
    const res = await axios.put(`${BASE_URL}unfollow`, data, {
      headers: {
        Authorization: `Bearer ${token?.access}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
