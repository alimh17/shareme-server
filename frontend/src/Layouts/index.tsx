import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import Navbar from 'components/Navbar';
import Header from 'components/Header';
import BottomBar from 'components/BottomBar';

const Layouts: React.FC = (): JSX.Element => {
  return (
    <Box
      w="100%"
      h="100vh"
      sx={{
        overflow: 'auto',
      }}
    >
      <Header />
      <Navbar />
      <Outlet />
      <BottomBar />
    </Box>
  );
};

export default Layouts;
