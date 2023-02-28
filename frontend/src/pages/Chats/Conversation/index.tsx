import React, { useEffect, useState } from 'react';
import { Box, Divider, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import getConversationsRequest from 'server/ConversationRequest/getConversation';
import { useSelector } from 'react-redux';
import User from './User';

const Conversation: React.FC = (): JSX.Element => {
  const [conversations, setConversations] = useState<[]>([]);
  const user = useSelector((state: any) => state.User.user);

  useEffect(() => {
    getConversationsRequest(user?._id).then((data: any) => {
      setConversations(data);
    });
  }, [user]);

  return (
    <Box
      sx={{
        borderRight: '.5px solid #aaaaaa',
      }}
      w={{ base: '100%', md: 'md' }}
    >
      <Flex flexFlow="column" alignItems="center">
        <Heading as="h2" p="5" fontSize="2xl">
          Conversation
        </Heading>
        <Divider />
        <VStack w="100%" px="2">
          {conversations?.map((c: any) => (
            <User conversation={c} myId={user?._id} key={c._id} />
          ))}
        </VStack>
      </Flex>
    </Box>
  );
};

export default Conversation;
