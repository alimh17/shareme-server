import React from 'react';
import { Box, Text, useColorMode, useMediaQuery } from '@chakra-ui/react';
import { faker } from '@faker-js/faker';

const Sidebar: React.FC = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isMinThan1300] = useMediaQuery('(min-width : 1300px)');
  const [isMinThan1500] = useMediaQuery('(min-width : 1500px)');

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '20',
        right: '10',
        maxWidth: '400px',
        w: '30rem',
        display: isMinThan1300 ? 'block' : 'none',
        bg: colorMode === 'dark' ? 'dark800' : '#eeeeee',
        p: '8',
        borderRadius: '8px',
      }}
    >
      <Text>{faker.lorem.lines()}</Text>
    </Box>
  );
};

export default Sidebar;
