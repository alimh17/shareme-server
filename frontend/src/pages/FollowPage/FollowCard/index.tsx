import React from 'react';
import { Avatar, Button, Card, CardBody, CardFooter, Center, Text, useColorMode } from '@chakra-ui/react';
import config from 'config/index.json';

interface Props {
  user: any;
  onClick: (data: any) => void;
}

const { IMAGES_URL } = config;

const FollowCard: React.FC<Props> = ({ user, onClick }): JSX.Element => {
  const { colorMode } = useColorMode();

  return (
    <Card
      sx={{
        w: '80%',
        h: '70%',
        bg: colorMode === 'dark' ? 'dark500' : '#fafafa',
      }}
    >
      <CardBody>
        <Center flexFlow="column" gap={5}>
          <Avatar src={user.profile.slice(0, 4) === 'http' ? user.profile : IMAGES_URL + user.profile} size="2xl" />
          <Text fontSize="xl" fontWeight="bold">
            {user.username}
          </Text>
        </Center>
      </CardBody>
      <CardFooter>
        <Center w="100%">
          <Button colorScheme="blue" variant={user.follow ? 'outline' : 'solid'} w="100%" onClick={() => onClick(user)}>
            {user.follow ? 'Unfollow' : 'Follow'}
          </Button>
        </Center>
      </CardFooter>
    </Card>
  );
};

export default FollowCard;
