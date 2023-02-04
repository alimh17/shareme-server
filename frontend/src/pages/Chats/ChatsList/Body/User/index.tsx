import React from 'react';

import { Avatar, Flex, HStack, Spacer, VStack, Text, useColorMode, IconButton } from '@chakra-ui/react';
import { faker } from '@faker-js/faker';
import { BsCheck2All } from 'react-icons/bs';
import { BiDotsVerticalRounded } from 'react-icons/bi';

const User: React.FC = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      sx={{
        corusor: 'pointer',
        bg: colorMode === 'dark' ? '#3D424A' : '#ffffff',
        p: '4',
        borderRadius: 8,
        my: '3',
        position: 'relative',
      }}
    >
      <HStack w="100%">
        <Avatar src={faker.image.avatar()} />
        <VStack>
          <Text textAlign="left">{faker.name.fullName()}</Text>
          <Text textAlign="left">{faker.lorem.slug()}</Text>
        </VStack>
        <Spacer />
        <VStack>
          <IconButton aria-label="Options" bg="inherit" icon={<BiDotsVerticalRounded />} />
          <Text sx={{ position: 'absolute', left: '5', bottom: '0', fontSize: 'xs' }}>19:12</Text>
          <BsCheck2All />
        </VStack>
      </HStack>
    </Flex>
  );
};

export default User;
