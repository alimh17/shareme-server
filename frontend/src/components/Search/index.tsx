import React from 'react';
import axios from 'axios';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Button,
  InputGroup,
  Input,
  Text,
  HStack,
  Avatar,
} from '@chakra-ui/react';

import config from 'config/index.json';
import { Link, useNavigate } from 'react-router-dom';

const { BASE_URL, IMAGES_URL } = config;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Search: React.FC<Props> = ({ isOpen, onClose }): JSX.Element => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [err, setErr] = React.useState<string>('');
  const [data, setData] = React.useState<{ username: string; profile: string }>({ username: '', profile: '' });

  const navigate = useNavigate();

  const handleSubmit = (e: React.MouseEvent) => {
    const sendRequest = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${BASE_URL}search/${searchValue}`);
        setLoading(false);
        setData(data?.data);
        setErr('');
      } catch (err: any) {
        if (err.response.status === 404) {
          setErr('User is not exist');
          setLoading(false);
          setData({ username: '', profile: '' });
        }
      }
    };
    sendRequest();
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Search</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup>
            <Input
              placeholder="Search username"
              value={searchValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
            />
          </InputGroup>
          <Text p={5} color="red.500" textAlign="center">
            {err}
          </Text>
          <HStack
            display={data?.username ? 'flex' : 'none'}
            onClick={() => {
              navigate(`/${data?.username}`);
              onClose();
              setData({ username: '', profile: '' });
              setSearchValue('');
            }}
          >
            <Avatar src={data?.profile?.slice(0, 4) === 'http' ? data?.profile : IMAGES_URL + data?.profile} />
            <Text>{data?.username}</Text>
          </HStack>
        </ModalBody>

        <ModalFooter>
          <Button isLoading={loading} colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Search;
