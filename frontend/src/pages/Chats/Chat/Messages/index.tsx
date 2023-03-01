import React from 'react';
import ScrollToBottom, { useScrollToEnd } from 'react-scroll-to-bottom';
import { Box, useColorMode } from '@chakra-ui/react';

import Message from '../Message';
import { useSelector } from 'react-redux';

interface Props {
  messages: {}[];
}

const Messages: React.FC<Props> = ({ messages }): JSX.Element => {
  const ScrollRef = React.useRef<null | HTMLDivElement>(null);
  const userData = useSelector((state: any) => state.Chat.userData);

  const { colorMode } = useColorMode();

  React.useEffect(() => {
    ScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, userData]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'column',
        overflowY: 'scroll',
        '::-webkit-scrollbar': {
          width: '8px',
          background: colorMode === 'dark' ? 'dark500' : '#eaeaea',
        },
        '::-webkit-scrollbar-thumb': {
          borderRadius: '8px',
          background: colorMode === 'dark' ? 'dark800' : '#cccccc',
        },
      }}
    >
      {messages?.map((m: any) => (
        <div key={m._id}>
          <Message message={m} user={userData} />
        </div>
      ))}
      <div ref={ScrollRef} />
    </Box>
  );
};

export default Messages;
