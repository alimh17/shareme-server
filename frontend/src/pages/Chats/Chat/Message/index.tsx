import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

import { FiSend } from 'react-icons/fi';
import { BsEmojiSmile } from 'react-icons/bs';

import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorMode,
} from '@chakra-ui/react';

interface Props {
  onMessage: (message: string) => void;
}

const Message: React.FC<Props> = ({ onMessage }): JSX.Element => {
  const [messageValue, SetMessageValue] = useState<string>('');
  const [selectedEmoji, setSelectedEmoji] = useState<any>(null);
  const [showEmojiPicker, setShowEmojiPicker] = React.useState<boolean>(false);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      css={{
        '@media screen and (max-height : 700px)': {
          bottom: '2rem',
        },
        '@media screen and (min-height : 700px)': {
          bottom: '2rem',
        },
        '@media screen and (min-height : 800px)': {
          bottom: '1rem',
        },
        '@media screen and (min-height : 900px)': {
          bottom: '-4px',
        },
      }}
      sx={{
        position: 'absolute',
        bottom: '2',
        w: '100%',
        px: '4',
      }}
    >
      <Box
        sx={{
          positon: 'relative',
          zIndex: '10',
        }}
      >
        {showEmojiPicker && (
          <EmojiPicker
            theme={colorMode === 'dark' ? 'dark' : 'light'}
            onEmojiClick={({ emoji }) => SetMessageValue((current) => current + emoji)}
          />
        )}
      </Box>
      <InputGroup w="100%">
        <InputLeftElement>
          <IconButton aria-label="Emoji" icon={<BsEmojiSmile />} onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
        </InputLeftElement>
        <Input
          placeholder="message"
          pl="14"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => SetMessageValue(e.target.value)}
          value={messageValue}
        />
        <InputRightElement
          sx={{
            position: 'relative',
            right: '30px',
          }}
          width="1rem"
        >
          <IconButton aria-label="Send" icon={<FiSend />} onClick={() => onMessage(messageValue)} />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default Message;
