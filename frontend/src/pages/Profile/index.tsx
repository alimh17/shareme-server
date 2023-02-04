import React from 'react';
import { Container, useMediaQuery } from '@chakra-ui/react';

import Gourd from 'HOC/Guard';
import Head from './Head';
import Posts from './Posts';

const Profile: React.FC = (): JSX.Element => {
  const [isMaxThan1200] = useMediaQuery('(min-width : 1200px)');

  return (
    <Gourd>
      <Container
        sx={{
          maxWidth: isMaxThan1200 ? '1000' : '700',
          mt: '10',
        }}
        centerContent
      >
        <Head />
        <Posts />
      </Container>
    </Gourd>
  );
};

export default Profile;
