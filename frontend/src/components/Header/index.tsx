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
  useMediaQuery,
} from '@chakra-ui/react';
import { faker } from '@faker-js/faker';
import { useEffect } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import config from 'config/index.json';

const { BASE_URL } = config;

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isMinThan600] = useMediaQuery('(max-width : 600px)');
  const [isMinThan768] = useMediaQuery('(max-width : 768px)');

  const { pathname } = useLocation();
  const user = useSelector((state: any) => state.User.user);

  return (
    <HStack
      w="100"
      py="2"
      justifyContent="space-between"
      position="sticky"
      top="0"
      zIndex="10"
      px={10}
      bg={colorMode === 'dark' ? 'dark800' : '#eeeeee'}
      as="nav"
    >
      <Flex
        sx={{
          display:
            (isMinThan768 && 'none') || (pathname === '/login' && 'none') || (pathname === '/register' && 'none'),
        }}
      >
        <Link to="/profile">
          <Center gap={2}>
            <Avatar name={user.username} src={BASE_URL + user.profile} sx={{ cursor: 'pointer' }}>
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
            <Text fontSize="md" as="b" display={isMinThan600 ? 'none' : 'block'}>
              {user.username}
            </Text>
          </Center>
        </Link>
      </Flex>
      <Heading as="h3" size="lg">
        Shareme
      </Heading>
      <Center gap={5}>
        <Link
          to="/add-post"
          style={{
            display: isMinThan768
              ? 'none'
              : pathname === '/login'
              ? 'none'
              : pathname === '/register'
              ? 'none'
              : 'flex',
          }}
        >
          <IconButton
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
          defaultChecked={colorMode === 'dark' && false}
        />
      </Center>
    </HStack>
  );
};

export default Header;
