import axios from 'axios';
import config from 'config/index.json';
const { BASE_URL } = config;

const getConversationsRequest = async (id: string) => {
  const shareme = localStorage.getItem('shareme');
  const token = shareme ? JSON.parse(shareme) : {};

  try {
    const { data } = await axios.get(`${BASE_URL}conversation/${id}`, {
      headers: {
        Authorization: `Bearer ${token?.access}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default getConversationsRequest;
