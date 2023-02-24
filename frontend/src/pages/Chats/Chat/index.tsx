import React, { useState } from 'react';
import { Box, Divider, useColorMode } from '@chakra-ui/react';
import { io } from 'socket.io-client';

import Head from './Head';
import Message from './Message';
import Messages from './Messages';
import { useSelector } from 'react-redux';

interface ChatProps {
  onOpen: any;
}

const Chat: React.FC<ChatProps> = ({ onOpen }): JSX.Element => {
  const { colorMode } = useColorMode();
  const [messages, setMessages] = useState<{}[]>([]);

  const currentChat = useSelector((state: any) => state.Chat.currentChat);

  const handleSetMessages = (message: string) => {
    const cpMessages = [...messages];
    const newMessage = {
      id: Math.random() * 1000,
      message,
    };
    cpMessages.push(message);
    setMessages(cpMessages);
  };

  return (
    <Box
      sx={{
        flex: '8',
        margin: 'auto',
        position: 'relative',
        background: colorMode === 'dark' ? 'dark800' : '#eeeeee',
      }}
      h={{ base: '84vh', lg: '90vh' }}
    >
      <Head onOpen={onOpen} chat={currentChat} />
      <Divider />
      <Messages messages={messages} />
      {/* //? Input Message */}
      <Message onMessage={handleSetMessages} />
    </Box>
  );
};

export default Chat;
