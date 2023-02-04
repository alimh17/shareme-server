import React from 'react';
import { Box } from '@chakra-ui/react';
import User from './User';

const Body: React.FC = (): JSX.Element => {
  return (
    <Box
      sx={{
        px: '3',
        gap: '3',
      }}
    >
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
      <User />
    </Box>
  );
};

export default Body;
