import axios from 'axios';
import config from 'config/index.json';
const { BASE_URL } = config;

const changePasswordRequest = async (code: string, email: string, values: any): Promise<any> => {
  try {
    const { data } = await axios.post(`${BASE_URL}auth/change-password`, { code, email, values });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default changePasswordRequest;
