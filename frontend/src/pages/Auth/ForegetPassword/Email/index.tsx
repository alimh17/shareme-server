import React from 'react';
import {
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  useColorMode,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { EmailSchema } from 'utils/AuthValidation';
import forgetPassword from 'server/AuthRequest/foregetPasswordRequest';
import { useDispatch } from 'react-redux';
import { initUser } from 'store/UserSlice';

interface IInitialValues {
  email: string;
}

const initialValues: IInitialValues = {
  email: '',
};

interface Props {
  onChange: (value: string) => void;
}

const Email: React.FC<Props> = ({ onChange }) => {
  const toast = useToast();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: EmailSchema,
    onSubmit: async (values) => {
      forgetPassword(values, toast).then((data: any) => {
        if (data) {
          dispatch(initUser(data.user));
          onChange('change-password');
        }
      });
    },
  });

  return (
    <VStack gap={5} justifyContent="space-around" h="90%">
      <Heading as="h2" py="5">
        Enter your Email
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        <Center flexFlow="column" gap={5}>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <InputGroup>
              <InputLeftAddon children="@" pointerEvents="none" />
              <Input
                type="email"
                placeholder="@example.com"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </InputGroup>
            {formik.errors.email && (
              <Text color="red.500" textAlign="center" fontSize={12} py="2">
                {formik.errors.email}
              </Text>
            )}
          </FormControl>
          <Button size="lg" bg="blue.500" w="60" type="submit">
            Submit
          </Button>
        </Center>
      </form>
    </VStack>
  );
};

export default Email;
