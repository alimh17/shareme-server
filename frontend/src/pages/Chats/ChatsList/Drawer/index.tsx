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

interface DrawerComProps {
  isOpen: any;
  onClose: any;
}

const DrawerCom: React.FC<DrawerComProps> = ({ isOpen, onClose }): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();

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
          <User />
          <User />
          <User />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerCom;
