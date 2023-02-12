import React, { useEffect } from 'react';
import { useJwt } from 'react-jwt';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactElement;
}

const AuthGuard: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const shareme = localStorage.getItem('shareme');
  const token = shareme ? JSON.parse(shareme) : {};

  const { isExpired } = useJwt(token?.access);

  useEffect(() => {
    if (token.access || !isExpired) {
      navigate('/');
    }
  }, []);

  return <>{children}</>;
};

export default AuthGuard;
