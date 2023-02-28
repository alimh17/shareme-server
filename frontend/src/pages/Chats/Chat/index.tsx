import React, { useEffect, useState } from 'react';
import { Avatar, Box, Heading, HStack, Spacer, IconButton, Text, Divider, AvatarBadge } from '@chakra-ui/react';
import { BiArrowBack, BiDotsVerticalRounded } from 'react-icons/bi';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import getMessagesRequest from 'server/Messages/getMessages';
import newMessageRequest from 'server/Messages/newMessageRequest';
import config from 'config/index.json';
import Messages from './Messages';
import { EmojiClickData } from 'emoji-picker-react';
import MessageInput from './MessageInput/MessageInput';

const { IMAGES_URL } = config;

interface Props {
  socket: any;
  status: string;
  onStatus: (input: string) => void;
  onOnline: (value: boolean) => void;
  online: boolean;
}

const Chat: React.FC<Props> = ({ socket, status, onStatus, onOnline, online }): JSX.Element => {
  const [messages, setMessages] = useState<{}[]>([{}]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [arriveMessage, setArriveMessage] = useState<any>(null);

  const user = useSelector((state: any) => state.User.user);
  const currentChat = useSelector((state: any) => state.Chat.currentChat);
  const userData = useSelector((state: any) => state.Chat.userData);

  const dispatch = useDispatch();

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
      socket.emit('users', userData?._id);
      socket.on('status', (data: any) => {
        if (data) {
          onOnline(true);
        } else {
          onOnline(false);
        }
      });
    }
  }, [currentChat]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleEmoji = (emoji: EmojiClickData, event: MouseEvent) => {
    setNewMessage((current) => current + emoji?.emoji);
  };

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

  const handleSendMessage = () => {
    if (newMessage !== '') {
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
        flexFlow: 'column',
      }}
      w={{ base: '100%', md: '80%' }}
      display={{ base: status === 'chat' ? 'flex' : 'none', md: 'flex' }}
      mb={{ base: '3rem', md: '0' }}
    >
      {currentChat?._id ? (
        <>
          <HStack p="2">
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              aria-label="back"
              variant="ghost"
              icon={<BiArrowBack />}
              onClick={() => {
                onStatus('conversation');
              }}
            />
            <Avatar src={userData?.profile.slice(0, 4) === 'http' ? userData?.profile : IMAGES_URL + userData?.profile}>
              <AvatarBadge boxSize={5} bg={online ? 'green.500' : 'gray.500'} />
            </Avatar>
            <Text>{userData?.username}</Text>
            <Spacer />
            <IconButton aria-label="options" variant="ghost" icon={<BiDotsVerticalRounded />} />
          </HStack>
          <Divider />
          <Messages messages={messages} />
          <Spacer />
          <MessageInput
            newMessage={newMessage}
            onSubmit={handleSubmit}
            onSend={handleSendMessage}
            onChange={handleChange}
            onEmoji={handleEmoji}
          />
        </>
      ) : (
        <Heading>Select a conversation</Heading>
      )}
    </Box>
  );
};

export default Chat;
