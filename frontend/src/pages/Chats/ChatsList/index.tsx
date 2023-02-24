import React from 'react';
import { Box, Divider, useColorMode } from '@chakra-ui/react';
import Head from './Head';
import Body from './Body';

const ChatsList: React.FC = (): JSX.Element => {
  const { colorMode } = useColorMode();

  return (
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
      sx={{
        flex: '4',
        h: '90vh',
        borderRadius: '8',
        background: colorMode === 'dark' ? 'dark800' : 'white',
        overflowY: 'scroll',
      }}
      display={{ base: 'none', lg: 'block' }}
    >
      <Head />
      <Divider />
      <Body />
    </Box>
  );
};

export default ChatsList;
