import React from 'react';
import {
  Avatar,
  Flex,
  HStack,
  Spacer,
  VStack,
  Text,
  useColorMode,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { BsCheck2All } from 'react-icons/bs';
import { BiDotsVerticalRounded, BiTrash } from 'react-icons/bi';
import config from 'config/index.json';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserOfChatList } from 'store/ChatSlice';
import removeUserOfChatListRequest from 'server/ChatListRequest/removeUserOfChatList';
import { setCurrentChat } from 'store/ChatSlice';

interface Props {
  user: any;
}

const { IMAGES_URL } = config;

const User: React.FC<Props> = ({ user }): JSX.Element => {
  const { colorMode } = useColorMode();
  const currentChat = useSelector((state: any) => state.Chat.currentChat);

  const dispatch = useDispatch();

  return (
    <Flex
      sx={{
        corusor: 'pointer',
        bg: currentChat._id === user._id ? 'blue.500' : colorMode === 'dark' ? '#3D424A' : '#FFFFFF',
        p: '4',
        borderRadius: 8,
        my: '3',
        position: 'relative',
      }}
      onClick={() => {
        dispatch(setCurrentChat(user));
      }}
    >
      <HStack w="100%">
        <Avatar src={user?.avatar?.slice(0, 4) === 'http' ? user.avatar : IMAGES_URL + user.avatar} />
        <VStack>
          <Text textAlign="left">{user.name ? user.name : user.username}</Text>
          {/* <Text textAlign="left">{faker.lorem.slug()}</Text> */}
        </VStack>
        <Spacer />
        <VStack>
          <Menu>
            <MenuButton as={IconButton} aria-label="Options" icon={<BiDotsVerticalRounded />} variant="ghost" />
            <MenuList>
              <MenuItem
                icon={<BiTrash fontSize={18} />}
                color="red.500"
                onClick={() => {
                  dispatch(removeUserOfChatList(user._id));
                  removeUserOfChatListRequest(user.username).then((res: any) => {
                    console.log(res);
                  });
                }}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
          <Text sx={{ position: 'absolute', left: '5', bottom: '0', fontSize: 'xs' }}>19:12</Text>
          <BsCheck2All />
        </VStack>
      </HStack>
    </Flex>
  );
};

export default User;
