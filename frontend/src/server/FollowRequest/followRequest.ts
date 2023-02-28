import axios from 'axios';
import config from 'config/index.json';

const { BASE_URL } = config;

const followRequest = async (data: any): Promise<any> => {
  const shareme = localStorage.getItem('shareme');
  const token = shareme ? JSON.parse(shareme) : {};

  const { _id, username, profile } = data;

  try {
    const res = await axios.put(
      `${BASE_URL}follow`,
      { _id, username, profile },
      {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      },
    );
  } catch (err) {
    console.log(err);
  }
};

export default followRequest;
