import React from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import ChatsList from './ChatsList';
import Chat from './Chat';
import DrawerCom from './ChatsList/Drawer';
import Gourd from 'HOC/Guard';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChat } from 'store/ChatSlice';

const Chats: React.FC = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const chatList = useSelector((state: any) => state.Chat.chatList);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setCurrentChat(chatList[0]));
  }, []);

  return (
    <Gourd>
      <Box
        sx={{
          right: '0',
          marginTop: '1',
        }}
        position={{ base: 'relative', md: 'absolute' }}
        left={{ base: '0', md: '20' }}
      >
        <Flex gap={3}>
          <ChatsList />
          <Chat onOpen={onOpen} />
        </Flex>
        <DrawerCom isOpen={isOpen} onClose={onClose} />
      </Box>
    </Gourd>
  );
};

export default Chats;
