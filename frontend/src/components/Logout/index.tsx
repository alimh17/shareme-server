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
  useMediaQuery,
} from '@chakra-ui/react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { initUser } from 'store/UserSlice';
import { useDispatch } from 'react-redux';

const Logout: React.FC = (): JSX.Element => {
  const Overlay = () => <ModalOverlay bg="none" backdropFilter="auto" backdropInvert="80%" backdropBlur="2px" />;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<Overlay />);
  const [isMinThan768] = useMediaQuery('(max-width : 768px)');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Tooltip label="Logout">
        <IconButton
          fontSize={isMinThan768 ? '18' : '25'}
          variant="ghost"
          colorScheme="gray"
          aria-label="Logout"
          color="red.600"
          gap={4}
          icon={
            <>
              <AiOutlineLogout />
              {isMinThan768 && <Text>Logout</Text>}
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
