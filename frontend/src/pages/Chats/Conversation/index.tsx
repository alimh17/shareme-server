import React, { useEffect, useState } from 'react';
import { Box, Divider, Flex, Heading, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import getConversationsRequest from 'server/ConversationRequest/getConversation';
import { useDispatch, useSelector } from 'react-redux';
import User from './User';
import { setCurrentChat, setUserData } from 'store/ChatSlice';

interface Props {
  onStatus: (input: string) => void;
  status: string;
}

const Conversation: React.FC<Props> = ({ status, onStatus }): JSX.Element => {
  const [conversations, setConversations] = useState<[]>([]);
  const user = useSelector((state: any) => state.User.user);

  const dispatch = useDispatch();

  useEffect(() => {
    getConversationsRequest(user?._id).then((data: any) => {
      setConversations(data);
    });
  }, [user, status]);

  useEffect(() => {
    dispatch(setCurrentChat({}));
    dispatch(setUserData({}));
  }, []);

  return (
    <Box
      sx={{
        justifyContent: 'center',
      }}
      w={{ base: '100%', md: 'md' }}
      display={{ base: status === 'chat' ? 'none' : 'flex', md: 'flex' }}
    >
      <Flex flexFlow="column" alignItems="center" w="100%">
        <Heading as="h2" p="5" fontSize="2xl">
          Conversation
        </Heading>
        <Divider />
        <VStack w="100%" px="2">
          {conversations?.map((c: any) => (
            <User conversation={c} myId={user?._id} key={c._id} onStatus={onStatus} />
          ))}
        </VStack>
      </Flex>
    </Box>
  );
};

export default Conversation;
