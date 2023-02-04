import React, { useEffect } from 'react';
import { useJwt } from 'react-jwt';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initUser } from 'store/UserSlice';
import config from 'config/index.json';

const { SECRET_KEY } = config;

interface Props {
  children: React.ReactNode;
}

const Gourd: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shareme = JSON.parse(localStorage.getItem('shareme') || '');
  const { isExpired } = useJwt(shareme?.access);

  useEffect(() => {
    if (isExpired) {
      navigate('/login');
    } else {
      const { user } = shareme;
      dispatch(initUser(user));
    }
  }, []);

  return <>{children}</>;
};

export default Gourd;
