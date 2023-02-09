import axios from 'axios';
import config from 'config/index.json';

const { BASE_URL } = config;

const isFollow = async (profile: any): Promise<any> => {
  const shareme = localStorage.getItem('shareme');
  const token = shareme ? JSON.parse(shareme) : {};

  try {
    const res = await axios.post(
      `${BASE_URL}isfollow`,
      { profile },
      {
        headers: {
          Authorization: `Bearer ${token?.access}`,
        },
      },
    );
    return res;
  } catch (err: any) {
    console.log(err);
  }
};

export default isFollow;
