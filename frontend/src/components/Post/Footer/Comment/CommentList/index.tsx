import React from 'react';
import {
  Avatar,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BsFillReplyFill, BsThreeDots } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import config from 'config/index.json';
import deleteCommentRequest from 'server/CommentRequest/DeleteCommentRequest';

interface Props {
  comments: {}[];
  post: any;
  onDelete: (id: string) => void;
}

const { IMAGES_URL } = config;

const CommentList: React.FC<Props> = ({ comments, post, onDelete }): JSX.Element => {
  const user = useSelector((state: any) => state.User.user);
  return (
    <VStack
      sx={{
        maxH: '80',
        justifyContent: 'center',
        gap: '2',
        p: 2,
      }}
    >
      {comments.map((item: any) => (
        <HStack w="100%" key={item.id} alignItems="center" wordBreak="break-word">
          <Avatar size="sm" src={IMAGES_URL + item.profile} />
          <Text fontSize="sm">{item.text}</Text>
          <Spacer />
          <VStack>
            <Menu>
              <MenuButton as={IconButton} aria-label="comment-options" icon={<BsThreeDots />} variant="ghost" />
              <MenuList>
                <MenuItem icon={<BsFillReplyFill />}>Reply</MenuItem>
                {user?.username === post.owner.name ||
                  (user._id === item.to && (
                    <MenuItem
                      color="red.500"
                      icon={<FaTrash fontSize={18} />}
                      onClick={() => {
                        onDelete(item.id);
                        deleteCommentRequest(item).then((res) => console.log(res));
                      }}
                    >
                      Delete
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu>
            <Text fontSize="xx-small">{item.time}</Text>
          </VStack>
        </HStack>
      ))}
    </VStack>
  );
};

export default CommentList;
