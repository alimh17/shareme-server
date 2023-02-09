import React from 'react';
import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Notfound: React.FC = (): JSX.Element => {
  return (
    <Container
      maxWidth={990}
      sx={{
        height: '90vh',
      }}
    >
      <Flex flexFlow="column" alignItems="center" gap={5} justifyContent="center" h="100%">
        <Heading as="h1" fontSize="9xl">
          404
        </Heading>
        <Text textAlign="center">
          The page you are looking for might have been removed had its name changed or is temporarily unavailable.
        </Text>
        <Link to="/">
          <Button colorScheme="blue">Home</Button>
        </Link>
      </Flex>
    </Container>
  );
};

export default Notfound;
