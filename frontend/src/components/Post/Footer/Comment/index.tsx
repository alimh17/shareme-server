import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiSmile } from 'react-icons/bs';
import { TfiComment } from 'react-icons/tfi';

interface Props {
  allComments: [];
}

const Comment: React.FC<Props> = ({ allComments }) => {
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<[]>([]);
  const [displayComments, setDisplayComments] = useState<boolean>(false);
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const { colorMode } = useColorMode();

  const handleAddComment = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cpComments = [...comments];
      cpComments.push(e.target?.value);
      setComments(cpComments);
      setComment('');
    }
  };

  useEffect(() => {
    setComments(allComments);
  }, []);

  return (
    <Flex flexFlow="column">
      <IconButton
        variant="ghost"
        colorScheme="gray"
        size="lg"
        aria-label="Comments"
        icon={<TfiComment />}
        onClick={() => setDisplayComments(!displayComments)}
        w={5}
      />

      {displayComments && (
        <Box
          sx={{
            position: 'relative',
            left: '-12',
            w: '100%',
            display: 'flex',
            flexFlow: 'column',
          }}
        >
          <VStack
            sx={{
              maxH: '60',
              overflow: 'scroll',
              justifyContent: 'center',
            }}
          >
            {comments.map((item) => (
              <Text key={item}>{item}</Text>
            ))}
          </VStack>
          <Box
            sx={{
              position: 'absolute',
              bottom: '3rem',
            }}
            left={{ base: '5', md: '10' }}
          >
            {showEmoji && (
              <EmojiPicker
                theme={colorMode === 'dark' ? 'dark' : 'light'}
                lazyLoadEmojis={true}
                onEmojiClick={() => {}}
              />
            )}
          </Box>
          <InputGroup>
            <Flex
              sx={{
                display: 'block',
                flexFlow: 'column',
              }}
              w={{ base: '80', md: '96' }}
            >
              <Input
                placeholder="Write comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={handleAddComment}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  aria-label="Emoji"
                  icon={<BsEmojiSmile />}
                  onClick={() => setShowEmoji(!showEmoji)}
                  bg="inherit"
                />
              </InputRightElement>
            </Flex>
          </InputGroup>
        </Box>
      )}
    </Flex>
  );
};

export default Comment;
