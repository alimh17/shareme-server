import React from 'react';
import {
  Avatar,
  AvatarBadge,
  Box,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { BiDotsVerticalRounded, BiMessageRounded, BiSearch } from 'react-icons/bi';
import { FiHome } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';

import Logout from 'components/Logout';

import { PathCondition } from 'utils/PathCondition';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import config from 'config/index.json';

const { IMAGES_URL } = config;

interface Props {
  onOpen: () => void;
}

const BottomBar: React.FC<Props> = ({ onOpen }): JSX.Element => {
  const { colorMode } = useColorMode();

  const user = useSelector((state: any) => state.User.user);
  const { pathname } = useLocation();

  return (
    <HStack
      sx={{
        position: 'fixed',
        bottom: '0',
        w: '100%',
        padding: '12px',
        bg: colorMode === 'dark' ? 'dark800' : 'white',
        borderTop: colorMode === 'light' && '1px solid #eaeaea',
        justifyContent: 'space-around',
      }}
      display={PathCondition(pathname) ? { base: 'flex', md: 'none' } : 'none'}
    >
      <Link to={`${user?.username}`}>
        <Avatar name={user?.username} src={IMAGES_URL + user?.profile} sx={{ cursor: 'pointer' }}>
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar>
      </Link>
      <Link to="/chats">
        <IconButton fontSize="25" variant="ghost" colorScheme="gray" aria-label="Chats" icon={<BiMessageRounded />} />
      </Link>
      <Link to="/">
        <IconButton fontSize="25" variant="ghost" colorScheme="gray" aria-label="Home" icon={<FiHome />} />
      </Link>
      <Link to="/add-post">
        <IconButton
          fontSize="25"
          variant="ghost"
          colorScheme="gray"
          aria-label="Setting"
          icon={<AiOutlinePlusCircle fontSize="25" />}
        />
      </Link>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<BiDotsVerticalRounded />}
          variant="ghost"
          fontSize="25"
          colorScheme="dark800"
        />
        <MenuList>
          <MenuItem icon={<BiSearch fontSize="20" />} onClick={onOpen}>
            Search
          </MenuItem>
          <Link to="/setting">
            <MenuItem icon={<IoSettingsOutline fontSize="20" />}>Setting</MenuItem>
          </Link>
          <Box pl="3">
            <Logout />
          </Box>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default BottomBar;
