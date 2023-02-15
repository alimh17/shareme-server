import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { HiHeart } from 'react-icons/hi';

interface Porps {}

const Like: React.FC<Porps> = (): JSX.Element => {
  return <IconButton variant="ghost" colorScheme="red" size="lg" aria-label="Like" icon={<HiHeart />} />;
};

export default Like;
