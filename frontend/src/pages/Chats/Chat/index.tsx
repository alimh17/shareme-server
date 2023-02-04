import React from 'react';
import { Box, useColorMode, useMediaQuery } from '@chakra-ui/react';

import Head from './Head';
import Message from './Message';
import Messages from './Messages';

interface ChatProps {
  onOpen: any;
}

const Chat: React.FC<ChatProps> = ({ onOpen }): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();

  const [isMinThan768] = useMediaQuery('(max-width : 768px)');

  return (
    <Box
      sx={{
        flex: '8',
        margin: 'auto',
        position: 'relative',
        h: isMinThan768 ? '82vh' : '90vh',
        background: colorMode === 'dark' ? 'dark800' : '#eeeeee',
      }}
    >
      <Head onOpen={onOpen} />
      <Messages />
      {/* //? Input Message */}
      <Message />
    </Box>
  );
};

export default Chat;
