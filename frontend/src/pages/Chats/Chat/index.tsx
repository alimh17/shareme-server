import React, { useEffect, useState, useRef } from 'react';
import { Avatar, Box, Heading, HStack, Spacer, IconButton, Text, Divider, InputGroup, Input } from '@chakra-ui/react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import moment from 'moment';
import { useSelector } from 'react-redux';
import getMessagesRequest from 'server/Messages/getMessages';
import newMessageRequest from 'server/Messages/newMessageRequest';
import config from 'config/index.json';
import Messages from './Messages';
// import Message from './Message';

const { IMAGES_URL } = config;

interface Props {
  socket: any;
}

const Chat: React.FC<Props> = ({ socket }): JSX.Element => {
  const [messages, setMessages] = useState<{}[]>([{}]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [arriveMessage, setArriveMessage] = useState<any>(null);

  const user = useSelector((state: any) => state.User.user);
  const currentChat = useSelector((state: any) => state.Chat.currentChat);
  const userData = useSelector((state: any) => state.Chat.userData);

  useEffect(() => {
    socket.on('getMessage', (data: any) => {
      setArriveMessage({ sender: data?.senderId, text: data?.text, time: data?.time });
    });
  }, []);

  useEffect(() => {
    arriveMessage &&
      currentChat?.members.includes(arriveMessage.sender) &&
      setMessages((prev) => [...prev, arriveMessage]);
  }, [arriveMessage, currentChat]);

  useEffect(() => {
    if (currentChat._id) {
      getMessagesRequest(currentChat?._id).then((data: any) => {
        setMessages(data?.messages);
      });
    }
  }, [currentChat]);

  const handleSubmit = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newMessage !== '') {
      const message = {
        sender: user._id,
        text: newMessage,
        time: moment().format('LT'),
        conversationId: currentChat._id,
      };

      socket.emit('sendMessage', {
        senderId: user._id,
        receiverId: userData._id,
        text: newMessage,
        time: moment().format('LT'),
      });

      newMessageRequest(message).then((data: any) => {
        setMessages((current: any) => [...current, data?.newMessage]);
        setNewMessage('');
      });
    }
  };

  return (
    <Box
      sx={{
        w: '100%',
        flexFlow: 'column',
        overflowY: 'none',
      }}
      display={{ base: 'none', md: 'flex' }}
    >
      {currentChat?._id ? (
        <>
          <HStack p="2">
            <Avatar
              src={userData?.profile.slice(0, 4) === 'http' ? userData?.profile : IMAGES_URL + userData?.profile}
            />
            <Text>{userData?.username}</Text>
            <Spacer />
            <IconButton aria-label="options" variant="ghost" icon={<BiDotsVerticalRounded />} />
          </HStack>
          <Divider />
          <Messages messages={messages} />
          <Spacer />
          <InputGroup>
            <Input
              placeholder="write somthing"
              value={newMessage}
              onKeyDown={handleSubmit}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
            />
          </InputGroup>
        </>
      ) : (
        <Heading>Select a conversation</Heading>
      )}
    </Box>
  );
};

export default Chat;
