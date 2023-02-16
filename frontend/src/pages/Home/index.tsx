import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import Gourd from 'HOC/Guard';

import Sidebar from './Sidebar';
import Navbar from 'components/Navbar';
import Main from './Main';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = (): JSX.Element => {
  const user = useSelector((state: any) => state.User.user);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user && user.followings < 5) {
      navigate('/follow-page');
    }
  }, [user]);

  return (
    <Gourd>
      <Flex>
        <Box flex={{ lg: '3' }} />
        <Main />
        <Sidebar />
      </Flex>
      <Navbar />
    </Gourd>
  );
};

export default Home;
