import React from 'react';
import { Box } from '@chakra-ui/react';
import Gourd from 'HOC/Guard';

import Sidebar from './Sidebar';
import Navbar from 'components/Navbar';
import Main from './Main';

const Home: React.FC = (): JSX.Element => {
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
