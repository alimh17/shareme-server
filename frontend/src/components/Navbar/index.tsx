import React from 'react';
import { IconButton, Spacer, useColorMode, useMediaQuery, VStack, Tooltip } from '@chakra-ui/react';

import { FiHome } from 'react-icons/fi';
import { ImPhone } from 'react-icons/im';
import { BiMessageRounded } from 'react-icons/bi';
import { HiOutlineVideoCamera } from 'react-icons/hi';
import { IoSettingsOutline } from 'react-icons/io5';

import { Link, useLocation } from 'react-router-dom';
import Logout from '../Logout';
import { PathCondition } from 'utils/PathCondition';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { pathname } = useLocation();

  return (
    <VStack
      sx={{
        position: 'absolute',
        left: 0,
        top: '64px',
        h: '90vh',
        p: '3',
        bg: colorMode === 'dark' ? 'dark800' : 'white',
        borderRight: colorMode === 'light' ? '1px solid #eaeaea' : '',
        gap: '5',
      }}
      display={PathCondition(pathname) ? { base: 'none', md: 'flex' } : 'none'}
    >
      <Tooltip label="Home">
        <Link to="/">
          <IconButton fontSize="25" variant="ghost" colorScheme="gray" aria-label="Home" icon={<FiHome />} />
        </Link>
      </Tooltip>
      <Tooltip label="Voice Call">
        <IconButton fontSize="25" variant="ghost" colorScheme="gray" aria-label="Phone" icon={<ImPhone />} />
      </Tooltip>
      <Tooltip label="Video Call">
        <IconButton
          fontSize="25"
          variant="ghost"
          colorScheme="gray"
          aria-label="Video"
          icon={<HiOutlineVideoCamera />}
        />
      </Tooltip>
      <Tooltip label="Chats">
        <Link to="/chats">
          <IconButton fontSize="25" variant="ghost" colorScheme="gray" aria-label="Chats" icon={<BiMessageRounded />} />
        </Link>
      </Tooltip>
      <Tooltip label="Setting">
        <Link to="/setting">
          <IconButton
            fontSize="25"
            variant="ghost"
            colorScheme="gray"
            aria-label="Setting"
            icon={<IoSettingsOutline />}
          />
        </Link>
      </Tooltip>
      <Spacer />
      <Logout />
    </VStack>
  );
};

export default Navbar;
