import React from 'react';
import { Avatar, Box, HStack, Text, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import config from 'config/index.json';

const { IMAGES_URL } = config;
interface Props {
  user: any;
  message: any;
}
const Message: React.FC<Props> = React.memo(({ user, message }): JSX.Element => {
  const me = useSelector((state: any) => state.User.user);

  return (
    <Box
      my={2}
      display="flex"
      justifyContent={message?.sender === me?._id ? 'flex-end' : 'flex-start'}
      key={message?._id}
    >
      <Box
        w="fit-content"
        maxWidth="70%"
        bg={message?.sender === me?._id ? 'blue.500' : 'gray.500'}
        borderRadius={message?.sender === me?._id ? '15px 15px 0 15px' : '15px 15px  15px 0'}
        display="flex"
        p={2}
      >
        <HStack p={2} flexDirection={message?.sender === me?._id ? 'row-reverse' : 'row'} gap={5}>
          <VStack>
            <Avatar
              src={
                message?.sender === me?._id
                  ? me?.profile.slice(0, 4) === 'http'
                    ? me.profile
                    : IMAGES_URL + me?.profile
                  : user?.profile.slice(0, 4) === 'http'
                  ? user?.profile
                  : IMAGES_URL + user?.profile
              }
            />
            <Text fontSize="xs">{message.time}</Text>
          </VStack>
          <Text>{message.text}</Text>
        </HStack>
      </Box>
    </Box>
  );
});

export default Message;
