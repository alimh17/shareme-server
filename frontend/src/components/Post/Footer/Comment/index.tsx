import React, { useEffect, useState } from 'react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { TfiComment } from 'react-icons/tfi';
import { useSelector } from 'react-redux';
import moment from 'moment';

import CommentList from './CommentList';
import Emoji from './Emoji';
import CommentInput from './CommentInput';
import addCommentRequest from 'server/CommentRequest/AddCommentRequest';

interface Props {
  post: any;
}

const Comment: React.FC<Props> = ({ post }) => {
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<{}[]>([]);
  const [displayComments, setDisplayComments] = useState<boolean>(false);
  const [showEmoji, setShowEmoji] = useState<boolean>(false);

  const user = useSelector((state: any) => state.User.user);

  const handleAddComment = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      if (target.value !== '') {
        //! Here set comment text
        setComment(target.value);

        const newComment = {
          id: Math.random() * 10000,
          type: 'comment',
          profile: user.profile,
          name: user.name ? user.name : user.username,
          time: moment().format('MMM Do YY'),
          text: comment,
          from: post._id,
          to: user._id,
          createAt: new Date(),
        };

        //! Here set comment object
        setComments([...comments, newComment]);

        //! Here send Request for adding comment
        addCommentRequest(newComment).then((res) => {
          // console.log(res);
        });
        //! Reset comment text
        setComment('');
      }
    }
  };

  const handleAddEmoji = (emoji: string) => {
    setComment((current) => current + emoji);
  };

  const handleSetComment = (text: string) => {
    setComment(text);
  };

  const handleToggleEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  const handleDeleteComment = (id: string) => {
    const cpComments = [...comments];
    const deleted = cpComments.filter((f: any) => f.id !== id);
    setComments(deleted);
  };

  useEffect(() => {
    //! Sort posts by publication time
    // const sorted = post.comment.sort(function (a: any, b: any) {
    //   return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
    // });
    setComments(post.comment);
  }, []);

  return (
    <Flex flexFlow="column" w="2rem">
      <IconButton
        variant="ghost"
        colorScheme="gray"
        size="lg"
        aria-label="Comments"
        icon={<TfiComment />}
        fontSize="20"
        onClick={() => setDisplayComments(!displayComments)}
        w={5}
      />

      {displayComments && (
        <Box
          sx={{
            position: 'relative',
            left: '-6',
            right: 'auto',
            top: '1rem',
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center',
            alingItems: 'center',
            m: 'auto',
          }}
          w="50rem"
          maxW={{ base: '18rem', lg: '25rem' }}
        >
          <CommentList comments={comments} post={post} onDelete={handleDeleteComment} />
          <Emoji show={showEmoji} comment={comment} onEmoji={handleAddEmoji} />
          <CommentInput
            comment={comment}
            onText={handleSetComment}
            onPress={handleAddComment}
            toggle={handleToggleEmoji}
          />
        </Box>
      )}
    </Flex>
  );
};

export default Comment;
