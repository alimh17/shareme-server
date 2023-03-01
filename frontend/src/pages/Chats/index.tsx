import React, { useEffect } from 'react';
import { Box, Divider } from '@chakra-ui/react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

import Conversation from './Conversation';
import Chat from './Chat';

const socket = io('ws://localhost:3001');

const Chats: React.FC = (): JSX.Element => {
  const user = useSelector((state: any) => state.User.user);

  const [status, setStatus] = React.useState<string>('conversation');
  const [online, setOnline] = React.useState<boolean>(false);

  const currentChat = useSelector((state: any) => state.Chat.currentChat);

  const handleStatus = (input: string): void => {
    setStatus(input);
  };

  const handleSetOnline = (value: boolean): void => {
    setOnline(value);
  };

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
      <Conversation status={status} onStatus={handleStatus} />
      <Divider orientation="vertical" colorScheme="telegram" />
      <Chat socket={socket} status={status} onStatus={handleStatus} onOnline={handleSetOnline} online={online} />
    </Box>
  );
};

export default Chats;
