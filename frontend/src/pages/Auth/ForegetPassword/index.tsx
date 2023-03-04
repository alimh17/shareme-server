import React, { useState } from 'react';
import { Center, Container, useColorMode, VStack } from '@chakra-ui/react';
import Email from './Email';
import Password from './Password';

const ForgetPassword: React.FC = () => {
  const [activeForm, setActiveForm] = useState<string>('email');
  const { colorMode } = useColorMode();

  const handleChangeActiveForm = (value: string) => {
    setActiveForm(value);
  };

  return (
    <Container
      sx={{
        maxWidth: 900,
        mt: 5,
        bg: colorMode === 'dark' ? 'dark800' : 'white',
        padding: 5,
        borderRadius: 8,
        boxShadow: colorMode === 'light' && 'lg',
        minH: '32rem',
        display: 'flex',
        justifyContent: 'center',
        border: colorMode === 'light' && '1px solid #eaeaea',
        position: 'relative',
      }}
    >
      <Center>
        {activeForm === 'email' ? (
          <Email onChange={handleChangeActiveForm} />
        ) : (
          <Password onChange={handleChangeActiveForm} />
        )}
      </Center>
    </Container>
  );
};

export default ForgetPassword;
