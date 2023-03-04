import React, { useState } from 'react';
import { Center, Container, Heading, HStack, PinInput, PinInputField, useColorMode, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import codeRequest from 'server/AuthRequest/codeRequest';
import { useNavigate } from 'react-router-dom';
import { userRequest } from 'server/UserRequest/userRequest';
import { initUser } from 'store/UserSlice';

interface Props {}

const Code: React.FC<Props> = (): JSX.Element => {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const email = useSelector((state: any) => state.User.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Container
      sx={{
        maxWidth: 900,
        mt: 5,
        bg: colorMode === 'dark' ? 'dark800' : 'white',
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
          <PinInput
            otp
            placeholder="-"
            onChange={(otp) => {
              if (otp.length === 5) {
                codeRequest(otp, email, toast).then((data) => {
                  userRequest().then((res: any) => {
                    dispatch(initUser(res.data.user));
                  });
                  navigate('/', { replace: true });
                });
              }
            }}
          >
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
