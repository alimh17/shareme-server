import React, { useCallback, useState } from 'react';
import { Button, Center, Container, Flex, Heading, Text, useColorMode, useToast, VStack } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { initUser } from 'store/UserSlice';

import { VscAccount } from 'react-icons/vsc';
import { RegisterSchema } from 'utils/AuthValidation';
import { registerRequest } from 'server/AuthRequest/registerRequest';

import Profile from './Profile';
import Username from './Username';
import Email from './Email';
import Password from './Password';

interface RegisterProps {}

interface IInitialValues {
  username: string;
  email: string;
  password: string;
}

const initialValues: IInitialValues = {
  username: '',
  email: '',
  password: '',
};

const Register: React.FC<RegisterProps> = (): JSX.Element => {
  const [profilePath, setProfilePath] = useState<string>('');
  const { colorMode } = useColorMode();

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles: any) => {
    const path = URL.createObjectURL(acceptedFiles[0]);
    setProfilePath(path);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': [],
    },
    multiple: false,
  });

  const formik = useFormik({
    initialValues,
    validationSchema: RegisterSchema,
    onSubmit: async (values: any) => {
      const data = await registerRequest(values, acceptedFiles[0], toast);
      if (data) {
        dispatch(initUser(data.email));
        navigate('/code');
      }
    },
  });

  return (
    <Container
      sx={{
        maxWidth: 900,
        mt: 2,
        bg: colorMode === 'dark' ? 'dark800' : 'white',
        border: colorMode === 'dark' ? 'none' : '1px solid #eaeaea',
        padding: 5,
        borderRadius: 8,
        boxShadow: colorMode === 'light' && 'lg',
      }}
    >
      <Center>
        <VStack gap={5}>
          <Heading as="h2" py="1">
            Register
          </Heading>
          <form onSubmit={formik.handleSubmit}>
            <Flex flexFlow="column" alignItems="center" gap={5}>
              <Profile getRootProps={getRootProps} getInputProps={getInputProps} profilePath={profilePath} />
              <Email formik={formik} />
              <Username formik={formik} />
              <Password formik={formik} />
              <Button size="lg" bg="blue.500" w="60" type="submit">
                Submit
              </Button>
            </Flex>
          </form>
          <Link to="/login">
            <Text _hover={{ color: 'blue.500' }}>
              I have an account
              <VscAccount style={{ margin: '0 5px', display: 'inline' }} />
            </Text>
          </Link>
        </VStack>
      </Center>
    </Container>
  );
};

export default Register;
