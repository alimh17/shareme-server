import axios from 'axios';
import config from 'config/index.json';

const { BASE_URL } = config;

const addUserToChatList = async (user: any): Promise<any> => {
  const shareme = localStorage.getItem('shareme');
  const token = shareme ? JSON.parse(shareme) : {};

  try {
    const res = await axios.post(`${BASE_URL}chat-list/add-user`, user, {
      headers: {
        Authorization: `Bearer ${token?.access}`,
      },
    });

    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

export default addUserToChatList;
