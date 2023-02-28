import React, { useEffect } from 'react';
import { Box, Container, Text } from '@chakra-ui/react';
import { io } from 'socket.io-client';

import Conversation from './Conversation';
import Chat from './Chat';
import { useSelector } from 'react-redux';

const socket = io('ws://localhost:3001');

const Chats: React.FC = (): JSX.Element => {
  const user = useSelector((state: any) => state.User.user);

  useEffect(() => {
    socket.emit('addUser', user._id);
  }, [user]);

  return (
    <Box
      sx={{
        h: '90vh',
        display: 'flex',
        gap: 5,
        overflowY: 'none',
      }}
      w={{ base: '100%', md: '90%' }}
      marginLeft={{ base: 0, md: '5rem' }}
    >
      <Conversation />
      <Chat socket={socket} />
    </Box>
  );
};

export default Chats;
