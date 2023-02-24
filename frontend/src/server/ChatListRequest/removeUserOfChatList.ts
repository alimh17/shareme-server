import axios from 'axios';
import config from 'config/index.json';

const { BASE_URL } = config;

const removeUserOfChatListRequest = async (user: any): Promise<any> => {
  const shareme = localStorage.getItem('shareme');
  const token = shareme ? JSON.parse(shareme) : {};

  try {
    const { data } = await axios.post(`${BASE_URL}chat-list/remove-user`, user, {
      headers: {
        Authorization: `Bearer ${token?.access}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default removeUserOfChatListRequest;
