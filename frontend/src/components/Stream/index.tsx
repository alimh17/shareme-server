import React from 'react';
import {
  Box,
  Button,
  Container,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import config from 'config/index.json';

interface Props {
  onClose: () => void;
  isOpen: boolean;
  call: string;
}

const { IMAGES_URL } = config;

const Stream: React.FC<Props> = ({ onClose, isOpen, call }): JSX.Element => {
  const me = useSelector((state: any) => state.User.user);
  const user = useSelector((state: any) => state.Chat.userData);
  console.log(user);

  return (
    <Modal onClose={onClose} size="full" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{call === 'video' ? 'Starting Video Call' : 'Starting Audio Call'}</ModalHeader>
        <ModalBody>
          {call === 'video' ? (
            <Container maxW={990}>
              <Box h={{ base: '40vh', md: '80vh' }} w={{ base: '100%', md: '100%' }}>
                <video controls width="100%" height="100%" style={{ objectFit: 'contain' }} />
              </Box>
              <Box
                position={{ base: 'relative', md: 'fixed' }}
                bottom={{ md: '-5' }}
                h={{ base: '40vh', md: '14rem' }}
                w={{ base: '100%', md: '22rem' }}
              >
                <video controls width="100%" height="100%" style={{ objectFit: 'contain' }} />
              </Box>
            </Container>
          ) : (
            <Container maxW={990}>
              <Box h={{ base: '40vh', md: '80vh' }} w={{ base: '100%', md: '100%' }}>
                <Image
                  src={me?.profile?.slice(0, 4) === 'http' ? me?.profile : IMAGES_URL + me?.profile}
                  sx={{
                    w: '100%',
                    h: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>
              <Box
                position={{ base: 'relative', md: 'fixed' }}
                bottom={{ md: '-5' }}
                h={{ base: '40vh', md: '14rem' }}
                w={{ base: '100%', md: '22rem' }}
              >
                <Image
                  src={user?.profile?.slice(0, 4) === 'http' ? user?.profile : IMAGES_URL + user?.profile}
                  sx={{
                    w: '100%',
                    h: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </Container>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Stream;
