import React, { useEffect } from 'react';
import { useJwt } from 'react-jwt';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from 'config/index.json';
import { userRequest } from 'server/userRequest';
import { initUser } from 'store/UserSlice';

interface Props {
  children: React.ReactNode;
}

const Gourd: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const shareme = localStorage.getItem('shareme');
  const token = shareme ? JSON.parse(shareme) : {};

  const { isExpired } = useJwt(token?.access);

  useEffect(() => {
    if (isExpired) {
      navigate('/login');
    } else {
      dispatch(initUser(token.user));
    }
  }, []);

  return <>{children}</>;
};

export default Gourd;
