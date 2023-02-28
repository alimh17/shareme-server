import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Center,
  Text,
  ModalFooter,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { CiWarning } from 'react-icons/ci';
import { useDispatch } from 'react-redux';
import { deletePost } from 'store/ProfileSlice';
import deletePostRequest from 'server/PostRequest/deletePostRequest';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const WarningModal: React.FC<Props> = ({ isOpen, onClose, id }): JSX.Element => {
  const toast = useToast();
  const dispatch = useDispatch();
  return (
    <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center flexFlow="column" gap={5}>
            <CiWarning fontSize={82} color="yellow" />
            <Text>Do you want to delete this post?</Text>
          </Center>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            No
          </Button>
          <Button
            bg="red.500"
            onClick={() => {
              deletePostRequest(id, toast).then((res) => {
                toast({
                  duration: 3000,
                  isClosable: true,
                  position: 'bottom-left',
                  title: 'Success',
                  description: 'Post successfully created',
                  status: 'success',
                });
              });
              onClose();
              dispatch(deletePost());
            }}
          >
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WarningModal;
