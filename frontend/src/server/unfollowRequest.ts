import axios from 'axios';
import config from 'config/index.json';

const { BASE_URL } = config;

export const unfollowRequest = async (data: any) => {
  const shareme = localStorage.getItem('shareme');
  const token = shareme ? JSON.parse(shareme) : {};

  const { _id, username, profile } = data;

  try {
    const res = await axios.put(
      `${BASE_URL}unfollow`,
      { _id, username, profile },
      {
        headers: {
          Authorization: `Bearer ${token?.access}`,
        },
      },
    );
  } catch (err) {
    console.log(err);
  }
};
