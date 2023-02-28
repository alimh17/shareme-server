import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { userRequest } from 'server/UserRequest/userRequest';
import { initUser } from 'store/UserSlice';
import { PathCondition } from 'utils/PathCondition';

interface Props {
  children: React.ReactNode;
}

const InitState: React.FC<Props> = ({ children }): JSX.Element => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  React.useEffect(() => {
    if (PathCondition(pathname)) {
      userRequest().then((res: any) => {
        dispatch(initUser(res.data.user));
      });
    }
  }, []);

  return <>{children}</>;
};

export default InitState;
