import React, { useEffect } from 'react';
import { Avatar, Button, Center, Divider, Flex, Heading, HStack, Text, useColorMode, VStack } from '@chakra-ui/react';
import { faker } from '@faker-js/faker';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileCondition } from 'utils/ProfileCondition';
import config from 'config/index.json';
import FollowBTN from './FollowBTN';
import Followers from './Followers';
import { BiMessageAdd } from 'react-icons/bi';
import { setCurrentChat } from 'store/ChatSlice';
import { useNavigate } from 'react-router-dom';
import newConversationsRequest from 'server/ConversationRequest/newConversation';

interface Props {}

const { IMAGES_URL } = config;

const Head: React.FC<Props> = () => {
  const [followers, setFollowers] = React.useState<number>(0);
  const { colorMode } = useColorMode();

  const me = useSelector((state: any) => state.User.user);
  const profile = useSelector((state: any) => state.Profile.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateFollowers = (params: string) => {
    if (params === 'plus') setFollowers(followers + 1);
    if (params === 'min') setFollowers(followers - 1);
  };

  useEffect(() => {
    setFollowers(profile?.followers);
  }, [profile]);

  return (
    <Flex
      justifyContent="space-between"
      w="100%"
      sx={{
        bg: colorMode === 'dark' ? 'dark800' : 'white',
        borderRadius: '8',
        border: colorMode === 'light' && '1px solid #eaeaea',
        py: '5',
      }}
      flexFlow={{ base: 'column', md: 'row' }}
    >
      <Center flex={4}>
        <Avatar
          src={
            ProfileCondition(me?.username, profile?.username)
              ? me?.profile?.slice(0, 4) === 'http'
                ? me?.profile
                : IMAGES_URL + me?.profile
              : profile?.profile?.slice(0, 4) === 'http'
              ? profile?.profile
              : IMAGES_URL + profile?.profile
          }
          size="2xl"
        />
      </Center>
      <VStack flex={8}>
        <Heading as="h3" fontSize="2xl" my={5} fontWeight="bold">
          {profile.name ? profile.name : profile.username}
        </Heading>
        <Text px="3" fontWeight="extrabold" fontSize="sm">
          {profile.bio}
        </Text>
        <Divider />
        <HStack gap="4" p="3">
          <Followers followers={followers} />
          <Text
            sx={{
              textAlign: 'center',
              p: '3',
              borderRadius: '8px',
              _hover: { bg: colorMode ? 'dark500' : 'white', cursor: 'pointer' },
            }}
          >
            Followings {profile.followings}
          </Text>
          <Text
            sx={{
              textAlign: 'center',
              p: '3',
              borderRadius: '8px',
              _hover: { bg: colorMode ? 'dark500' : 'white', cursor: 'pointer' },
            }}
          >
            Posts {profile.posts}
          </Text>
        </HStack>
        {!ProfileCondition(me?.username, profile?.username) && (
          <Center w="100%">
            <Button
              colorScheme="blue"
              onClick={() => {
                newConversationsRequest({ senderId: me._id, receiverId: profile._id }).then((res: any) => {
                  // dispatch(setCurrentChat(res?.conversation));
                });
                navigate('/chats');
              }}
            >
              Message <BiMessageAdd fontSize={24} />
            </Button>
            <FollowBTN onClick={handleUpdateFollowers} />
          </Center>
        )}
      </VStack>
    </Flex>
  );
};

export default Head;
