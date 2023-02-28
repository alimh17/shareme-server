import React from 'react';
import { Container, useMediaQuery } from '@chakra-ui/react';

import Gourd from 'HOC/Guard';
import Head from './Head';
import Posts from './Posts';
import { useLocation, useNavigate } from 'react-router-dom';
import { profileRequest } from 'server/UserRequest/profileRequest';
import { useDispatch } from 'react-redux';
import { initProfile } from 'store/ProfileSlice';
import { userRequest } from 'server/UserRequest/userRequest';
import { initUser } from 'store/UserSlice';

const Profile: React.FC = (): JSX.Element => {
  const [isMaxThan1200] = useMediaQuery('(min-width : 1200px)');

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  React.useEffect(() => {
    profileRequest(pathname).then((res: any) => {
      if (res?.status === undefined) {
        navigate('/404');
      }
      dispatch(initProfile(res.data?.user));
    });
  }, [navigate]);

  return (
    <Gourd>
      <Container
        sx={{
          maxWidth: isMaxThan1200 ? '1000' : '700',
          mt: '10',
        }}
        centerContent
      >
        <Head />
        <Posts />
      </Container>
    </Gourd>
  );
};

export default Profile;
