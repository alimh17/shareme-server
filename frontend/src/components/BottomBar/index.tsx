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
  useMediaQuery,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { BiDotsVerticalRounded, BiMessageRounded } from 'react-icons/bi';
import { FiHome } from 'react-icons/fi';
import { HiOutlineVideoCamera } from 'react-icons/hi';
import { ImPhone } from 'react-icons/im';
import { IoSettingsOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';

import Logout from 'components/Logout';

import config from 'config/index.json';

const { BASE_URL } = config;

const BottomBar: React.FC = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isMinThan768] = useMediaQuery('(max-width : 768px)');

  const user = useSelector((state: any) => state.User.user);

  return (
    <HStack
      sx={{
        position: 'fixed',
        bottom: '0',
        w: '100%',
        padding: '12px',
        display: isMinThan768 ? 'flex' : 'none',
        bg: colorMode === 'dark' ? 'dark800' : '#eeeeee',
        justifyContent: 'space-around',
      }}
    >
      <Link to="/profile">
        <Avatar name={user.username} src={BASE_URL + user.profile} sx={{ cursor: 'pointer' }}>
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar>
      </Link>
      <Link to="/chats">
        <IconButton fontSize="25" variant="ghost" colorScheme="gray" aria-label="Chats" icon={<BiMessageRounded />} />
      </Link>
      <Link to="/">
        <IconButton fontSize="25" variant="ghost" colorScheme="gray" aria-label="Home" icon={<FiHome />} />
      </Link>
      <IconButton fontSize="25" variant="ghost" colorScheme="gray" aria-label="Setting" icon={<IoSettingsOutline />} />
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
          <MenuItem icon={<HiOutlineVideoCamera fontSize="20" />}>Video Call</MenuItem>
          <MenuItem icon={<ImPhone fontSize="20" />}>Voice Call</MenuItem>
          <Box pl="3">
            <Logout />
          </Box>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default BottomBar;
