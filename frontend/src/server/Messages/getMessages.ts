import axios from 'axios';
import config from 'config/index.json';
const { BASE_URL } = config;

const getMessagesRequest = async (conversationId: string): Promise<any> => {
  const shareme = localStorage.getItem('shareme');
  const token = shareme ? JSON.parse(shareme) : {};

  try {
    const { data } = await axios.get(`${BASE_URL}messages/${conversationId}`, {
      headers: {
        Authorization: `Bearer ${token?.access}`,
      },
    });

    return data;
  } catch (err) {
    console.log(err);
  }
};

export default getMessagesRequest;
