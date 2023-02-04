import React, { Suspense, lazy } from 'react';
import { Box, Container, useColorMode } from '@chakra-ui/react';
import Navbar from 'components/Navbar';
import Sidebar from './Sidebar';
import Gourd from 'HOC/Guard';

const Post = lazy(() => import('components/Post'));

const Home: React.FC = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Gourd>
      <Box
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
            background: colorMode === 'dark' ? 'dark800' : '#eeeeee',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: colorMode === 'dark' ? '#3D424A' : '#E2E8F0',
            borderRadius: '24px',
          },
        }}
      >
        <Container maxWidth="600px" sx={{ marginTop: '12px', gap: '5', pb: '20' }} centerContent>
          <Suspense fallback={<h2>Loading...</h2>}>
            <Post />
            <Post />
            <Post />
          </Suspense>
        </Container>
        <Sidebar />
        <Navbar />
      </Box>
    </Gourd>
  );
};

export default Home;
