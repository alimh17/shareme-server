import React from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Box, useColorMode } from '@chakra-ui/react';

interface Props {
  show: boolean;
  onClick: (selected: any) => void;
}

const Emoji: React.FC<Props> = ({ show, onClick }): JSX.Element => {
  const { colorMode } = useColorMode();

  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: '10',
        right: '0',
        top: 100,
      }}
    >
      {show && (
        <EmojiPicker theme={colorMode === 'dark' ? 'dark' : 'light'} lazyLoadEmojis={true} onEmojiClick={onClick} />
      )}
    </Box>
  );
};

export default Emoji;
