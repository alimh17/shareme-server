import React from 'react';
import { Button, Center, Container, Heading, Text, useColorMode, useToast, VStack } from '@chakra-ui/react';

import { VscAccount } from 'react-icons/vsc';
import { FiUnlock } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { LoginSchema } from 'utils/AuthValidation';
import Email from './Email';
import Password from './Password';
import { loginRequest } from 'server/AuthRequest/loginRequest';
import { userRequest } from 'server/UserRequest/userRequest';
import { initUser } from 'store/UserSlice';
import { useDispatch } from 'react-redux';
import AuthGuard from 'HOC/AuthGuard';

interface Props {}

interface IInitialValues {
  email: string;
  password: string;
}

const initialValues: IInitialValues = {
  email: '',
  password: '',
};

const Login: React.FC<Props> = (): JSX.Element => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const res: any = await loginRequest(values, toast);
      if (res.data) {
        navigate('/');
        userRequest().then((res: any) => {
          dispatch(initUser(res.data.user));
        });
      }
    },
  });

  return (
    // <AuthGuard>
    <Container
      sx={{
        maxWidth: 900,
        mt: 5,
        bg: colorMode === 'dark' ? 'dark800' : 'white',
        padding: 5,
        borderRadius: 8,
        boxShadow: colorMode === 'light' && 'lg',
      }}
    >
      <Center>
        <VStack gap={5}>
          <Heading as="h2" py="5">
            Login
          </Heading>
          <form onSubmit={formik.handleSubmit}>
            <Center flexFlow="column" gap={5}>
              <Email formik={formik} />
              <Password formik={formik} />
              <Button size="lg" bg="blue.500" w="60" type="submit">
                Submit
              </Button>
            </Center>
          </form>
          <Link to="/forget-password">
            <Text _hover={{ color: 'blue.500' }}>
              Forget Password? <FiUnlock style={{ margin: '0 5px', display: 'inline' }} />
            </Text>
          </Link>
          <Link to="/register">
            <Text _hover={{ color: 'blue.500' }}>
              Create New Account?
              <VscAccount style={{ margin: '0 5px', display: 'inline' }} />
            </Text>
          </Link>
        </VStack>
      </Center>
    </Container>
    // </AuthGuard>
  );
};

export default Login;
