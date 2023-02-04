import { CardFooter, HStack, IconButton } from '@chakra-ui/react';
import React from 'react';
import { HiHeart } from 'react-icons/hi';
import { TfiComment } from 'react-icons/tfi';

const Footer: React.FC = (): JSX.Element => {
  return (
    <CardFooter>
      <HStack>
        {/* <HiOutlineHeart/> */}
        <IconButton variant="ghost" colorScheme="red" size="lg" aria-label="Like" icon={<HiHeart />} />
        <IconButton variant="ghost" colorScheme="gray" size="lg" aria-label="Comments" icon={<TfiComment />} />
      </HStack>
    </CardFooter>
  );
};

export default Footer;
