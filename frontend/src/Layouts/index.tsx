import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useDisclosure } from '@chakra-ui/react';

import Navbar from 'components/Navbar';
import Header from 'components/Header';
import BottomBar from 'components/BottomBar';
import InitState from 'HOC/InitState';
import Search from 'components/Search';

const Layouts: React.FC = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      w="100%"
      h="100vh"
      sx={{
        overflow: 'auto',
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <InitState>
        <Header />
        <Navbar onOpen={onOpen} />
        <Outlet />
        <BottomBar onOpen={onOpen} />
        <Search isOpen={isOpen} onClose={onClose} />
      </InitState>
    </Box>
  );
};

export default Layouts;
