import { Flex, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React from 'react';
import { BsEmojiSmile } from 'react-icons/bs';

interface Props {
  comment: string;
  onText: (text: string) => void;
  onPress: (e: React.KeyboardEvent) => void;
  toggle: () => void;
}

const CommentInput: React.FC<Props> = ({ comment, onText, onPress, toggle }): JSX.Element => {
  return (
    <InputGroup>
      <Flex
        sx={{
          display: 'block',
          flexFlow: 'column',
          m: 'auto',
        }}
        w={{ base: '80', md: '96' }}
      >
        <Input
          placeholder="Write comment"
          value={comment}
          onChange={(e: React.ChangeEvent) => {
            const target = e.target as HTMLInputElement;
            onText(target.value);
          }}
          onKeyDown={onPress}
          pr="12"
        />
        <InputRightElement width="2.5rem">
          <IconButton aria-label="Emoji" icon={<BsEmojiSmile />} onClick={toggle} bg="inherit" />
        </InputRightElement>
      </Flex>
    </InputGroup>
  );
};

export default CommentInput;
