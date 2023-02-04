import React from 'react';
import { Box, Flex, useColorMode } from '@chakra-ui/react';
import { CSS } from './styles';
import User from 'pages/Chats/ChatsList/Body/User';

const Messages: React.FC = (): JSX.Element => {
  return (
    <Flex sx={{ overflowY: 'scroll', flexFlow: 'column' }} css={CSS}>
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
    </Flex>
  );
};

export default Messages;
