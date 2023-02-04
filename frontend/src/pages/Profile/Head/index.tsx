import React from 'react';
import {
  Avatar,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
  useColorMode,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { faker } from '@faker-js/faker';

interface Props {}

const Head: React.FC<Props> = () => {
  const { colorMode } = useColorMode();
  const [isMinThan768] = useMediaQuery('(max-width : 768px)');

  return (
    <Flex
      justifyContent="space-between"
      w="100%"
      sx={{
        bg: colorMode === 'dark' ? 'dark800' : '#eeeeee',
        borderRadius: '8',
        py: '5',
      }}
      flexFlow={isMinThan768 ? 'column' : 'row'}
    >
      <Center flex={4}>
        <Avatar src={faker.image.avatar()} w="150" h="150" />
      </Center>
      <VStack flex={8}>
        <Heading as="h3" fontSize="lg">
          {faker.name.fullName()}
        </Heading>
        <Text px="3">{faker.lorem.paragraph()}</Text>
        <Divider />
        <HStack gap="4" p="3">
          <Text
            sx={{
              textAlign: 'center',
              p: '3',
              borderRadius: '8px',
              _hover: { bg: colorMode ? 'dark500' : '#cccccc', cursor: 'pointer' },
            }}
          >
            Followers 220k
          </Text>
          <Text
            sx={{
              textAlign: 'center',
              p: '3',
              borderRadius: '8px',
              _hover: { bg: colorMode ? 'dark500' : '#cccccc', cursor: 'pointer' },
            }}
          >
            Followings 120k
          </Text>
          <Text
            sx={{
              textAlign: 'center',
              p: '3',
              borderRadius: '8px',
              _hover: { bg: colorMode ? 'dark500' : '#cccccc', cursor: 'pointer' },
            }}
          >
            Posts 20
          </Text>
        </HStack>
        <HStack justifyContent="flex-end" p="3" w="74%">
          <Button colorScheme="blue" w="100%">
            Follow
          </Button>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default Head;
