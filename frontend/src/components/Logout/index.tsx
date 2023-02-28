import React from 'react';
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { initUser } from 'store/UserSlice';
import { useDispatch } from 'react-redux';
import { setCurrentChat } from 'store/ChatSlice';

const Logout: React.FC = (): JSX.Element => {
  const Overlay = () => <ModalOverlay bg="none" backdropFilter="auto" backdropInvert="80%" backdropBlur="2px" />;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<Overlay />);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Tooltip label="Logout">
        <IconButton
          fontSize={{ base: '18', md: '25' }}
          variant="ghost"
          colorScheme="gray"
          aria-label="Logout"
          color="red.600"
          gap={4}
          icon={
            <>
              <AiOutlineLogout />
              {<Text display={{ base: 'block', md: 'none' }}>Logout</Text>}
            </>
          }
          onClick={() => {
            setOverlay(<Overlay />);
            onOpen();
          }}
        />
      </Tooltip>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Logout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Do you want to exit?</Text>
          </ModalBody>
          <ModalFooter gap="5">
            <Button
              onClick={() => {
                onClose();
                navigate('/login');
                localStorage.removeItem('shareme');
                dispatch(initUser(void {}));
                dispatch(setCurrentChat({}));
              }}
              bg="red.400"
            >
              Yes
            </Button>
            <Button onClick={onClose}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Logout;
