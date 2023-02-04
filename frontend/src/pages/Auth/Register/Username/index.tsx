import { Flex, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Text } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';

interface Props {
  formik: any;
}

const Username: React.FC<Props> = ({ formik }) => {
  return (
    <Flex>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <InputGroup size="lg" justifyContent="center">
          <InputLeftAddon children={<AiOutlineUser />} pointerEvents="none" />
          <Input
            name="username"
            placeholder="Alimh"
            w="auto"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
        </InputGroup>
        {formik.errors.username && (
          <Text color="red.500" textAlign="center" fontSize={12} py="2">
            {formik.errors.username}
          </Text>
        )}
      </FormControl>
    </Flex>
  );
};

export default Username;
