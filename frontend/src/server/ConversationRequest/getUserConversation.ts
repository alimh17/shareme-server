import axios from 'axios';
import config from 'config/index.json';
const { BASE_URL } = config;

const getUserConversationsRequest = async (userId: string) => {
  const shareme = localStorage.getItem('shareme');
  const token = shareme ? JSON.parse(shareme) : {};

  try {
    const { data } = await axios.get(`${BASE_URL}get-user/conversation/${userId}`, {
      headers: {
        Authorization: `Bearer ${token?.access}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default getUserConversationsRequest;
