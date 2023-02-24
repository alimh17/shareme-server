import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import User from './User';
import { useSelector } from 'react-redux';

const Body: React.FC = (): JSX.Element => {
  const chatList = useSelector((state: any) => state.Chat.chatList);
  return (
    <Box
      sx={{
        px: '3',
        gap: '3',
      }}
    >
      {chatList?.map((user: any) => (
        <User user={user} key={user._id} />
      ))}
    </Box>
  );
};

export default Body;
