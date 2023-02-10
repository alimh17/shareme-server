import React, { useEffect } from 'react';
import { Box, Container, useColorMode } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import Gourd from 'HOC/Guard';
import { userRequest } from 'server/userRequest';
import { initUser } from 'store/UserSlice';

import Sidebar from './Sidebar';
import Navbar from 'components/Navbar';
import Main from './Main';

const Home: React.FC = (): JSX.Element => {
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.User.user);

  useEffect(() => {
    userRequest().then((res: any) => {
      delete res.data.user.password;
      dispatch(initUser(res.data.user));
    });
  }, []);

  return (
    <Gourd>
      <Box>
        <Main />
      </Box>
      <Sidebar />
      <Navbar />
    </Gourd>
  );
};

export default Home;
