import { CardFooter, HStack, IconButton } from '@chakra-ui/react';
import React from 'react';
import { HiHeart } from 'react-icons/hi';
import Comment from './Comment';

interface Props {
  comments: [];
}

const Footer: React.FC<Props> = ({ comments }): JSX.Element => {
  return (
    <CardFooter>
      <HStack alignItems="flex-start">
        <IconButton variant="ghost" colorScheme="red" size="lg" aria-label="Like" icon={<HiHeart />} />
        <Comment allComments={comments} />
      </HStack>
    </CardFooter>
  );
};

export default Footer;
