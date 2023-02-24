import React, { useEffect } from 'react';
import { Avatar, AvatarBadge, Flex, HStack, IconButton, Spacer, Text, useColorMode } from '@chakra-ui/react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import config from 'config/index.json';

interface HeadProps {
  onOpen: () => void;
  chat: any;
}

const { IMAGES_URL } = config;

const Head: React.FC<HeadProps> = ({ onOpen, chat }): JSX.Element => {
  const { colorMode } = useColorMode();

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
        <IconButton
          aria-label="Drawer"
          bg="inherit"
          onClick={onOpen}
          icon={<RxHamburgerMenu />}
          display={{ base: 'block ', lg: 'none' }}
        />
        <Avatar src={chat?.avatar?.slice(0, 4) === 'http' ? chat.avatar : IMAGES_URL + chat.avatar}>
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar>
        <Text>{chat?.name ? chat.name : chat.username}</Text>
      </HStack>
      <Spacer />
      <IconButton fontSize={20} aria-label="Options" bg="inherit" icon={<BiDotsVerticalRounded />} />
    </Flex>
  );
};

export default Head;
