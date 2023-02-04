import React from 'react';
import { Box, Button, Container, Flex, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import ChatsList from './ChatsList';
import Chat from './Chat';
import DrawerCom from './ChatsList/Drawer';
import Gourd from 'HOC/Guard';

const Chats: React.FC = (): JSX.Element => {
  const [isMinThan768] = useMediaQuery('(max-width : 768px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Gourd>
      <Box
        sx={{
          position: isMinThan768 ? 'relative' : 'absolute',
          right: '0',
          marginTop: '1',
          left: isMinThan768 ? '0' : '20',
        }}
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
