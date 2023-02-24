import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { CSS } from './styles';
import User from 'pages/Chats/ChatsList/Body/User';

interface Props {
  messages: {}[];
}

const Messages: React.FC<Props> = ({ messages }): JSX.Element => {
  return (
    <Flex sx={{ overflowY: 'scroll', flexFlow: 'column' }} css={CSS}>
      {messages?.map((message: any) => (
        <Text>{message.message}</Text>
      ))}
    </Flex>
  );
};

export default Messages;
