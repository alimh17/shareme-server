import React, { useEffect, useState } from 'react';
import {
  Avatar,
  AvatarBadge,
  Center,
  Flex,
  Heading,
  HStack,
  IconButton,
  Switch,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { PathCondition } from 'utils/PathCondition';
import config from 'config/index.json';

const { IMAGES_URL } = config;

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [online, setOnline] = useState<boolean>(false);

  const { pathname } = useLocation();
  const user = useSelector((state: any) => state.User.user);

  useEffect(() => {
    if (navigator.onLine) {
      setOnline(true);
    } else {
      setOnline(false);
    }
  }, [navigator.onLine]);

  return (
    <HStack
      w="100"
      py="2"
      justifyContent="space-between"
      position="sticky"
      top="0"
      zIndex="10"
      px={10}
      bg={colorMode === 'dark' ? 'dark800' : 'white'}
      borderBottom={colorMode === 'light' ? '1px solid #eaeaea' : ''}
      as="nav"
    >
      <Flex display={PathCondition(pathname) ? { base: 'none', md: 'flex' } : 'none'}>
        <Link to={`/${user?.username}`}>
          <Center gap={2}>
            <Avatar name={user?.username} src={IMAGES_URL + user?.profile} sx={{ cursor: 'pointer' }}>
              <AvatarBadge boxSize="1.25em" bg={online ? 'green.500' : 'gray.500'} />
            </Avatar>
            <Text fontSize="md" as="b">
              {user?.username}
            </Text>
          </Center>
        </Link>
      </Flex>
      <Heading as="h3" size="lg">
        Shareme
      </Heading>
      <Center gap={5}>
        <Link to="/add-post" style={{ display: PathCondition(pathname) ? 'flex' : 'none' }}>
          <IconButton
            display={{ base: 'none', md: 'flex' }}
            aria-label="Add Post"
            icon={<AiOutlinePlusCircle fontSize={24} />}
            bg="inherit"
            _hover={{
              transform: 'rotate(90deg)',
            }}
          />
        </Link>
        <Switch
          size="md"
          variant="mode"
          onChange={() => toggleColorMode()}
          isChecked={colorMode === 'light' ? true : false}
        />
      </Center>
    </HStack>
  );
};

export default Header;
