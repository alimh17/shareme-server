import React from 'react';
import { CardBody, Heading, Image, Text, useMediaQuery, VStack } from '@chakra-ui/react';
import { faker } from '@faker-js/faker';

const Body: React.FC = (): JSX.Element => {
  return (
    <CardBody>
      <Image src={faker.image.image()} alt={faker.name.fullName()} borderRadius="sm" loading="lazy" />
      <VStack>
        <Heading>{faker.lorem.slug()}</Heading>
        <Text noOfLines={2}>{faker.lorem.paragraph()}</Text>
      </VStack>
    </CardBody>
  );
};

export default Body;
