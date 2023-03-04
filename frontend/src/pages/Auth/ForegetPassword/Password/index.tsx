import React, { useState } from 'react';
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  PinInput,
  PinInputField,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';
import { PasswordSchema } from 'utils/AuthValidation';
import { useSelector } from 'react-redux';
import changePasswordRequest from 'server/AuthRequest/changePasswordRequest';
import { useNavigate } from 'react-router-dom';

interface IInitialValues {
  password: string;
  confirmPassword: string;
}

const initialValues: IInitialValues = {
  password: '',
  confirmPassword: '',
};

interface Props {
  onChange: (value: string) => void;
}

const Password: React.FC<Props> = ({ onChange }): JSX.Element => {
  const [code, setCode] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setConfirmPassword] = useState<boolean>(false);

  const email = useSelector((state: any) => state.User.user);
  const navigate = useNavigate();
  const toast = useToast();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: PasswordSchema,
    onSubmit: async (values) => {
      changePasswordRequest(code, email, values).then((data) => {
        if (data) {
          navigate('/login', { replace: true });
          toast({
            title: 'Success',
            description: 'Your password has been successfully changed',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-left',
          });
        }
      });
    },
  });

  return (
    <VStack gap={5} justifyContent="space-around" py="5">
      <IconButton
        sx={{
          position: 'absolute',
          left: 5,
          top: 5,
        }}
        onClick={() => onChange('email')}
        aria-label="back-arrow"
        icon={<HiOutlineArrowLeft />}
      />
      <Heading as="h2" py="5">
        Change Password
      </Heading>
      <Text>Enter the emailed code</Text>
      <HStack gap={5}>
        <PinInput otp placeholder="-" onChange={(otp) => setCode(otp)}>
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
      <form onSubmit={formik.handleSubmit}>
        <Center flexFlow="column" gap={5}>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <InputLeftAddon
                children={showPassword ? <RxEyeOpen /> : <RxEyeClosed />}
                pointerEvents="painted"
                onClick={() => setShowPassword(!showPassword)}
              />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </InputGroup>
            {formik.errors.password && (
              <Text color="red.500" textAlign="center" fontSize={12} py="2">
                {formik.errors.password}
              </Text>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Confirm password</FormLabel>
            <InputGroup>
              <InputLeftAddon
                children={showConfirmPassword ? <RxEyeOpen /> : <RxEyeClosed />}
                pointerEvents="painted"
                onClick={() => setConfirmPassword(!showConfirmPassword)}
              />
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="********"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
            </InputGroup>
            {formik.errors.confirmPassword && (
              <Text color="red.500" textAlign="center" fontSize={12} py="2">
                {formik.errors.confirmPassword}
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

export default Password;
