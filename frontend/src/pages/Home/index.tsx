import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Gourd from 'HOC/Guard';

import Sidebar from './Sidebar';
import Navbar from 'components/Navbar';
import Main from './Main';

const Home: React.FC = (): JSX.Element => {
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
