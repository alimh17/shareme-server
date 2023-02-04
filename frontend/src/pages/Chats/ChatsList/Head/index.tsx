import React from 'react';

import { Heading, Input, InputGroup, InputRightAddon, VStack } from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';

const Head: React.FC = (): JSX.Element => {
  return (
    <VStack px="8" py="3">
      <Heading py="3" as="h2">
        Chats
      </Heading>
      <InputGroup>
        <Input type="text" placeholder="search" />
        <InputRightAddon children={<BiSearch />} />
      </InputGroup>
    </VStack>
  );
};

export default Head;
