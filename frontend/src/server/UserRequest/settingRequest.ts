import axios from 'axios';
import config from 'config/index.json';

const { BASE_URL } = config;

const settingRequest = async (values: any, file: any): Promise<any> => {
  const shareme = localStorage.getItem('shareme');
  const token = shareme ? JSON.parse(shareme) : {};

  try {
    const formData = new FormData();
    for (const data of Object.keys(values)) {
      formData.append(data, values[`${data}`]);
    }
    file && formData.append('file', file[0]);

    const res = await axios.post(`${BASE_URL}setting`, formData, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default settingRequest;
