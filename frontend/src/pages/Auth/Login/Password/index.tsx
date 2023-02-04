import { Flex, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Text } from '@chakra-ui/react';
import React from 'react';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';

interface Props {
  formik: any;
}

const Password: React.FC<Props> = ({ formik }) => {
  const [show, setShow] = React.useState<boolean>(false);
  const handleClick = () => setShow(!show);

  return (
    <Flex>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup size="lg" justifyContent="center">
          <InputLeftAddon
            _hover={{ cursor: 'pointer' }}
            children={show ? <RxEyeOpen /> : <RxEyeClosed />}
            onClick={handleClick}
          />
          <Input
            name="password"
            placeholder="********"
            w="auto"
            type={show ? 'text' : 'password'}
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
    </Flex>
  );
};

export default Password;
