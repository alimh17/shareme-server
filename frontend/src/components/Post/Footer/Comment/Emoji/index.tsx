import { Box, useColorMode } from '@chakra-ui/react';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import React from 'react';

interface Props {
  show: boolean;
  comment: string;
  onEmoji: (emoji: string) => void;
}

const Emoji: React.FC<Props> = ({ show, comment, onEmoji }): JSX.Element => {
  const { colorMode } = useColorMode();

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '3rem',
      }}
      left={{ base: '5', md: '10' }}
    >
      {show && (
        <EmojiPicker
          theme={colorMode === 'dark' ? Theme.DARK : Theme.LIGHT}
          lazyLoadEmojis={true}
          onEmojiClick={({ emoji }) => onEmoji(emoji)}
        />
      )}
    </Box>
  );
};

export default Emoji;
