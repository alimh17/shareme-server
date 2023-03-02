import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Heading,
  HStack,
  Spacer,
  IconButton,
  Center,
  Text,
  Divider,
  AvatarBadge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { BiArrowBack, BiDotsVerticalRounded, BiPhoneCall, BiTrash, BiVideo } from 'react-icons/bi';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import getMessagesRequest from 'server/Messages/getMessages';
import newMessageRequest from 'server/Messages/newMessageRequest';
import config from 'config/index.json';
import Messages from './Messages';
import { EmojiClickData } from 'emoji-picker-react';
import MessageInput from './MessageInput/MessageInput';
import removeConversation from 'server/ConversationRequest/removeConversation';
import { setCurrentChat, setUserData } from 'store/ChatSlice';
import Stream from 'components/Stream';

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
  const [typing, setTyping] = useState<boolean>(false);

  const [call, setCall] = useState<string>('video');

  const user = useSelector((state: any) => state.User.user);
  const currentChat = useSelector((state: any) => state.Chat.currentChat);
  const userData = useSelector((state: any) => state.Chat.userData);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('getMessage', (data: any) => {
      setArriveMessage({ sender: data?.senderId, text: data?.text, time: data?.time });
    });
  }, []);

  useEffect(() => {
    arriveMessage &&
      currentChat?.members?.includes(arriveMessage.sender) &&
      setMessages((prev) => [...prev, arriveMessage]);
    setTyping(false);
  }, [arriveMessage, currentChat]);

  useEffect(() => {
    if (currentChat?._id) {
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

  useEffect(() => {
    socket.on('send-typing', (data: any) => {
      setTyping(data?.typing);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleEmoji = (emoji: EmojiClickData, event: MouseEvent) => {
    setNewMessage((current) => current + emoji?.emoji);
  };

  const handleSubmit = async (e: React.KeyboardEvent) => {
    socket.emit('is-typing', {
      typin: true,
      senderId: user._id,
      receiverId: userData._id,
    });

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

  const handleVideoCall = () => {
    if (online) {
      setCall('video');
      onOpen();
    } else {
      toast({
        title: 'Error',
        description: `${userData.username} is offline`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const handleAudioCall = () => {
    if (online) {
      setCall('audio');
      onOpen();
    } else {
      toast({
        title: 'Error',
        description: `${userData.username} is offline`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
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
      <Stream onClose={onClose} isOpen={isOpen} call={call} />
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
            <Avatar
              src={userData?.profile?.slice(0, 4) === 'http' ? userData?.profile : IMAGES_URL + userData?.profile}
            >
              <AvatarBadge boxSize={5} bg={online ? 'green.500' : 'gray.500'} />
            </Avatar>
            <VStack>
              <Center flexFlow="column">
                <Text>{userData?.username}</Text>
                {typing && <Text fontSize="xs">Typing...</Text>}
              </Center>
            </VStack>
            <Spacer />
            <Menu>
              <MenuButton as={IconButton} aria-label="Options" icon={<BiDotsVerticalRounded />} variant="ghost" />
              <MenuList>
                <MenuItem icon={<BiVideo fontSize={22} />} onClick={handleVideoCall}>
                  Video Call
                </MenuItem>
                <MenuItem icon={<BiPhoneCall fontSize={22} />} onClick={handleAudioCall}>
                  Voice Call
                </MenuItem>
                <MenuItem
                  icon={<BiTrash fontSize={22} />}
                  color="red.500"
                  onClick={() => {
                    removeConversation(currentChat?._id);
                    dispatch(setCurrentChat({}));
                    dispatch(setUserData({}));
                    onStatus('conversation');
                  }}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
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
