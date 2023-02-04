import { Flex, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
  formik: any;
}

const Email: React.FC<Props> = ({ formik }): JSX.Element => {
  return (
    <Flex>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <InputGroup size="lg" justifyContent="center">
          <InputLeftAddon children="@" pointerEvents="none" />
          <Input
            name="email"
            placeholder="@example.com"
            w="auto"
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
    </Flex>
  );
};

export default Email;
