import React from 'react';
import { Center, Container, Heading, HStack, PinInput, PinInputField, useColorMode } from '@chakra-ui/react';

interface Props {}

const Code: React.FC<Props> = (): JSX.Element => {
  const { colorMode } = useColorMode();

  return (
    <Container
      sx={{
        maxWidth: 900,
        mt: 5,
        bg: colorMode === 'dark' ? 'dark800' : '#eeeeee',
        padding: 5,
        borderRadius: 8,
        h: '80vh',
        boxShadow: colorMode === 'light' && 'lg',
      }}
    >
      <Center alignItems="center" h="100%" flexFlow="column" gap={5}>
        <Heading as="h3" fontSize={22}>
          Please enter the code sent to the email
        </Heading>
        <HStack gap={5}>
          <PinInput otp placeholder="-" onChange={(otp) => console.log(otp)}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
      </Center>
    </Container>
  );
};

export default Code;
