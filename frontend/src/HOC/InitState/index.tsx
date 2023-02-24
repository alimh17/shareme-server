import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import getUserChatList from 'server/ChatListRequest/getUserChatList';
import { userRequest } from 'server/userRequest';
import { initChatList, setCurrentChat } from 'store/ChatSlice';
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
      getUserChatList().then((res: any) => {
        dispatch(initChatList(res.data));
      });
    }
  }, []);

  return <>{children}</>;
};

export default InitState;
