import React from 'react';
import { CardFooter, HStack } from '@chakra-ui/react';
import Comment from './Comment';
import Like from './Like';

interface Props {
  post: any;
}

const Footer: React.FC<Props> = ({ post }): JSX.Element => {
  return (
    <CardFooter>
      <HStack alignItems="flex-start">
        <Like post={post} />
        <Comment post={post} />
      </HStack>
    </CardFooter>
  );
};

export default Footer;
