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
  useMediaQuery,
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
  post: any;
}

const Post: React.FC<PostProps> = ({ height, post }): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isMinThan768] = useMediaQuery('(max-width : 768px)');

  const theme = useTheme();

  return (
    <Card
      sx={{
        bg: colorMode === 'dark' ? 'dark800' : 'white',
        boxShadow: colorMode === 'dark' ? 'sm' : 'lg',
        border: colorMode === 'dark' ? 'none' : '1px solid #eaeaea',
      }}
      maxW={isMinThan768 ? 'sm' : 'md'}
      height={height ? height : 'auto'}
    >
      <Head post={post} />
      <Body post={post} />
      <Footer />
    </Card>
  );
};

export default Post;
