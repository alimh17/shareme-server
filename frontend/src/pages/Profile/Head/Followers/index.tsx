import { Text, useColorMode } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

interface Props {
  followers: number;
}

const Followrs: React.FC<Props> = ({ followers }): JSX.Element => {
  const { colorMode } = useColorMode();

  return (
    <Text
      sx={{
        textAlign: 'center',
        p: '3',
        borderRadius: '8px',
        _hover: { bg: colorMode ? 'dark500' : 'white', cursor: 'pointer' },
      }}
    >
      Followers {followers}
    </Text>
  );
};

export default Followrs;
