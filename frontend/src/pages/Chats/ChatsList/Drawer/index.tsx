import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import User from '../Body/User';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';

interface DrawerComProps {
  isOpen: any;
  onClose: any;
}

const DrawerCom: React.FC<DrawerComProps> = ({ isOpen, onClose }): JSX.Element => {
  const { colorMode } = useColorMode();
  const chatList = useSelector((state: any) => state.Chat.chatList);

  return (
    <Drawer placement="left" isOpen={isOpen} onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent
        sx={{
          bg: colorMode === 'dark' ? 'dark800' : 'white',
        }}
      >
        <DrawerHeader borderBottomWidth="1px">
          <Flex justifyContent="space-between">
            <Heading>Chats</Heading>
            <IconButton aria-label="Close Drawer" icon={<FaTimes />} bg="inherit" onClick={onClose} fontSize="20" />
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          {chatList.map((user: any) => (
            <User user={user} key={user._id} />
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerCom;
