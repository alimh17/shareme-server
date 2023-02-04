import React from 'react';
import {
  Container,
  Card,
  Text,
  useColorMode,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Flex,
  Avatar,
  IconButton,
  Box,
  Heading,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { HiHeart } from 'react-icons/hi';
import { TfiComment } from 'react-icons/tfi';
import { faker } from '@faker-js/faker';
import { useTheme } from '@emotion/react';
import Head from './Head';
import Body from './Body';
import Footer from './Footer';

interface PostProps {
  height?: string;
}

const Post: React.FC<PostProps> = ({ height }): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();

  return (
    <Card
      sx={{
        bg: colorMode === 'dark' ? 'dark800' : '#eeeeee',
        boxShadow: colorMode === 'dark' ? 'sm' : 'lg',
        border: colorMode === 'dark' ? 'none' : '1px solid gray.600',
      }}
      maxW="md"
      height={height ? height : 'auto'}
    >
      <Head />
      <Body />
      <Footer />
    </Card>
  );
};

export default Post;
