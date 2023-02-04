import { Avatar, Box, CardHeader, Flex, Heading, IconButton, Text, useMediaQuery } from '@chakra-ui/react';
import { faker } from '@faker-js/faker';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

const Head: React.FC = (): JSX.Element => {
  const [isMinThan768] = useMediaQuery('(max-width : 768px)');

  return (
    <CardHeader>
      <Flex>
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Avatar name="Segun Adebayo" src={faker.image.avatar()} loading="lazy" />
          <Box sx={{ display: isMinThan768 ? 'none' : 'flex' }}>
            <Text fontSize="sm" size="sm">
              {faker.name.fullName()}
            </Text>
            <Text fontSize="sm">{faker.hacker.abbreviation()}</Text>
          </Box>
        </Flex>
        <IconButton variant="ghost" colorScheme="gray" aria-label="See menu" icon={<BsThreeDotsVertical />} />
      </Flex>
    </CardHeader>
  );
};

export default Head;
