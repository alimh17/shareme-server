import React from 'react';
import { Box, CardFooter, HStack, Center } from '@chakra-ui/react';
import Comment from './Comment';
import Like from './Like';

interface Props {
  post: any;
}

const Footer: React.FC<Props> = ({ post }): JSX.Element => {
  return (
    <CardFooter>
      <HStack w="auto" alignItems="flex-start" mb={10} position="relative">
        <Like post={post} />
        <Comment post={post} />
      </HStack>
    </CardFooter>
  );
};

export default Footer;
