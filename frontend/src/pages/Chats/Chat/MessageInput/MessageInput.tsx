import { Box, IconButton, Input, InputGroup, InputRightElement, useColorMode } from '@chakra-ui/react';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsEmojiSmile } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
import { MdOutlineAttachFile } from 'react-icons/md';

interface Props {
  newMessage: string;
  onSubmit: (e: React.KeyboardEvent) => void;
  onSend: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmoji: (emoji: EmojiClickData, event: MouseEvent) => void;
}

const MessageInput: React.FC<Props> = ({ newMessage, onSubmit, onSend, onChange, onEmoji }): JSX.Element => {
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const { colorMode } = useColorMode();

  // const onDrop = useCallback((acceptedFiles: any) => {
  //   // Do something with the files
  //   // onFilePaths(acceptedFiles);
  //   console.log(acceptedFiles);
  // }, []);
  // const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
  //   onDrop,
  //   accept: {
  //     'image/jpeg': [],
  //     'image/png': [],
  //     'video/mp4': [],
  //   },
  // });

  return (
    <>
      <InputGroup>
        <Input
          placeholder="write somthing"
          value={newMessage}
          onKeyDown={onSubmit}
          onChange={onChange}
          sx={{
            pr: '6rem',
          }}
        />
        {/* <Box {...getRootProps()}>
          <input
            {...getInputProps}
            style={{ position: 'absolute', right: 75, zIndex: 5, top: 8, width: '1rem', opacity: '0' }}
          />
          <InputRightElement width="10.5rem">
            <IconButton aria-label="file" variant="ghost" icon={<MdOutlineAttachFile />} size="sm" />
          </InputRightElement>
        </Box> */}
        <InputRightElement width="6.5rem">
          <IconButton
            size="sm"
            aria-label="emoji"
            variant="ghost"
            icon={<BsEmojiSmile />}
            onClick={() => setShowEmoji(!showEmoji)}
          />
        </InputRightElement>
        <InputRightElement width="2.5rem">
          <IconButton size="sm" aria-label="send" variant="ghost" icon={<FiSend />} onClick={onSend} />
        </InputRightElement>
      </InputGroup>
      <Box
        sx={{
          position: 'absolute',
          zIndex: '10',
          right: 10,
          bottom: 70,
        }}
      >
        {showEmoji && (
          <EmojiPicker
            theme={colorMode === 'dark' ? Theme.DARK : Theme.LIGHT}
            lazyLoadEmojis={true}
            onEmojiClick={onEmoji}
          />
        )}
      </Box>
    </>
  );
};

export default MessageInput;
