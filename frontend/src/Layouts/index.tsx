import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import Navbar from 'components/Navbar';
import Header from 'components/Header';
import BottomBar from 'components/BottomBar';
import InitState from 'HOC/InitState';

const Layouts: React.FC = (): JSX.Element => {
  return (
    <Box
      w="100%"
      h="100vh"
      sx={{
        overflow: 'auto',
      }}
    >
      <InitState>
        <Header />
        <Navbar />
        <Outlet />
        <BottomBar />
      </InitState>
    </Box>
  );
};

export default Layouts;
