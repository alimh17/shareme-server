import React from 'react';
import { FormControl, FormLabel, IconButton, InputGroup, InputRightElement, Textarea } from '@chakra-ui/react';
import { BsEmojiSmile } from 'react-icons/bs';

interface Props {
  toggle: () => void;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Description: React.FC<Props> = ({ toggle, value, onChange }): JSX.Element => {
  return (
    <FormControl my={5}>
      <FormLabel>Caption</FormLabel>
      <InputGroup size="md">
        <Textarea
          placeholder="Write a caption"
          resize="none"
          pr="16"
          rows={8}
          name="Description"
          value={value}
          onChange={onChange}
        />
        <InputRightElement width="4.5rem">
          <IconButton aria-label="Emoji" icon={<BsEmojiSmile />} onClick={toggle} bg="inherit" />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default Description;
