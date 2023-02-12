import React from 'react';
import {
  Avatar,
  AvatarBadge,
  Button,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Text,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { faker } from '@faker-js/faker';
import { RxHamburgerMenu } from 'react-icons/rx';

interface HeadProps {
  onOpen: () => void;
}

const Head: React.FC<HeadProps> = ({ onOpen }): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isMinThan1200] = useMediaQuery('(max-width : 1200px)');

  return (
    <Flex
      sx={{
        p: '3',
        mx: '1',
        borderRadius: '8',
        bg: colorMode === 'dark' ? 'dark800' : 'white',
        flexFlow: '1',
      }}
    >
      <HStack>
        {isMinThan1200 && <IconButton aria-label="Drawer" bg="inherit" onClick={onOpen} icon={<RxHamburgerMenu />} />}
        <Avatar src={faker.image.avatar()}>
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar>
        <Text>{faker.name.fullName()}</Text>
      </HStack>
      <Spacer />
      <IconButton fontSize={20} aria-label="Options" bg="inherit" icon={<BiDotsVerticalRounded />} />
    </Flex>
  );
};

export default Head;
