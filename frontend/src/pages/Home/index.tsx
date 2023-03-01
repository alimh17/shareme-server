import React from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import Gourd from 'HOC/Guard';

import Sidebar from './Sidebar';
import Navbar from 'components/Navbar';
import Main from './Main';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = (): JSX.Element => {
  const user = useSelector((state: any) => state.User.user);
  const navigate = useNavigate();

  const { onOpen } = useDisclosure();

  // React.useEffect(() => {
  //   if (user && user.followings < 5) {
  //     navigate('/follow-page');
  //   }
  // }, [user]);

  return (
    <Gourd>
      <Flex
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Box flex={{ lg: '3' }} />
        <Main />
        <Sidebar />
      </Flex>
      <Navbar onOpen={onOpen} />
    </Gourd>
  );
};

export default Home;
