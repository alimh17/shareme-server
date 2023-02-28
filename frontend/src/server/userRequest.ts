import axios from 'axios';
import config from 'config/index.json';

const { BASE_URL } = config;

export const userRequest = async (id?: string): Promise<any> => {
  const shareme = localStorage.getItem('shareme');
  const token = shareme ? JSON.parse(shareme) : {};
  try {
    const res = await axios.get(`${BASE_URL}get-user`, {
      headers: {
        Authorization: `Bearer ${token?.access}`,
        params: id,
      },
    });
    return res;
  } catch (err: any) {
    console.log(err?.response);
    return err;
  }
};

//! Here get all users data
export const getAllUserRequest = async (): Promise<any> => {
  const shareme = localStorage.getItem('shareme');
  const token = shareme ? JSON.parse(shareme) : {};
  try {
    const res = await axios.get(`${BASE_URL}get-user/users`, {
      headers: {
        Authorization: `Bearer ${token?.access}`,
      },
    });
    return res.data;
  } catch (err: any) {
    console.log(err?.response);
    return err;
  }
};
