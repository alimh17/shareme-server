import React from 'react';
import { Card, Text, useColorMode } from '@chakra-ui/react';
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

  const theme = useTheme();

  return (
    <Card
      sx={{
        bg: colorMode === 'dark' ? 'dark800' : 'white',
        boxShadow: colorMode === 'dark' ? 'sm' : 'lg',
        border: colorMode === 'dark' ? 'none' : '1px solid #eaeaea',
      }}
      maxW={{ base: 'sm', md: 'md', lg: 'lg' }}
      height={height ? height : 'auto'}
    >
      <Head post={post} />
      <Body post={post} />
      <Footer post={post} />
    </Card>
  );
};

export default Post;
