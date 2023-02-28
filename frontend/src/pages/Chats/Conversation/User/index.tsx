import React, { useEffect, useState } from 'react';
import { HStack, Avatar, Text, Spacer, IconButton, AvatarBadge } from '@chakra-ui/react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import getUserConversationsRequest from 'server/ConversationRequest/getUserConversation';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChat, setUserData } from 'store/ChatSlice';

import config from 'config/index.json';
const { IMAGES_URL } = config;

interface Props {
  conversation: any;
  myId: string;
  onStatus: (input: string) => void;
}

const User: React.FC<Props> = ({ conversation, myId, onStatus }): JSX.Element => {
  const [user, setUser] = useState<any>(null);
  const userData = useSelector((state: any) => state.Chat.userData);

  const dispatch = useDispatch();

  useEffect(() => {
    const friendId = conversation?.members?.find((m: any) => m !== myId);
    getUserConversationsRequest(friendId).then((data: any) => {
      setUser(data?.data);
    });
  }, [conversation, myId]);

  return (
    <HStack
      key={conversation._id}
      w="100%"
      mt="2"
      p="2"
      borderRadius="md"
      bg={userData._id === user?._id ? 'blue.500' : 'inherit'}
      onClick={() => {
        dispatch(setCurrentChat(conversation));
        dispatch(setUserData(user));
        onStatus('chat');
      }}
      _hover={{ cursor: 'pointer' }}
    >
      <Avatar src={user?.profile?.slice(0, 4) === 'http' ? user?.profile : IMAGES_URL + user?.profile} />
      <Text>{user?.username}</Text>
      <Spacer />
      <IconButton aria-label="options" variant="ghost" icon={<BiDotsVerticalRounded />} />
    </HStack>
  );
};

export default User;
