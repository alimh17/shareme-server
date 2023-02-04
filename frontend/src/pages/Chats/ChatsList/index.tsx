import React from 'react';
import { Box, Divider, useColorMode, useMediaQuery } from '@chakra-ui/react';
import Head from './Head';
import Body from './Body';

const ChatsList: React.FC = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isMinThan1200] = useMediaQuery('(max-width : 1200px)');

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
        background: colorMode === 'dark' ? 'dark800' : '#eeeeee',
        overflowY: 'scroll',
        display: isMinThan1200 ? 'none' : 'block',
      }}
    >
      <Head />
      <Divider />
      <Body />
    </Box>
  );
};

export default ChatsList;
