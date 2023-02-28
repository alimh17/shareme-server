import React from 'react';
import { IconButton, Spacer, useColorMode, VStack, Tooltip } from '@chakra-ui/react';

import { FiHome } from 'react-icons/fi';
import { BiMessageRounded, BiSearch } from 'react-icons/bi';
import { IoSettingsOutline } from 'react-icons/io5';

import { Link, useLocation } from 'react-router-dom';
import { PathCondition } from 'utils/PathCondition';
import Logout from '../Logout';

interface Props {
  onOpen: () => void;
}

const Navbar: React.FC<Props> = ({ onOpen }): JSX.Element => {
  const { colorMode } = useColorMode();
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
      <Tooltip label="Search">
        <IconButton
          fontSize="25"
          variant="ghost"
          colorScheme="gray"
          aria-label="Search"
          icon={<BiSearch />}
          onClick={onOpen}
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
