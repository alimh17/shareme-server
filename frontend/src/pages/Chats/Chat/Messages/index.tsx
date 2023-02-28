import React from 'react';
import ScrollToBottom, { useScrollToEnd } from 'react-scroll-to-bottom';
import { Box } from '@chakra-ui/react';

import Message from '../Message';
import { useSelector } from 'react-redux';

interface Props {
  messages: {}[];
}

const Messages: React.FC<Props> = ({ messages }): JSX.Element => {
  // const scrollEnd = useScrollToEnd();
  const ScrollRef = React.useRef<null | HTMLDivElement>(null);
  const userData = useSelector((state: any) => state.Chat.userData);

  React.useEffect(() => {
    ScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, userData]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'column',
        overflowY: 'scroll',
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
