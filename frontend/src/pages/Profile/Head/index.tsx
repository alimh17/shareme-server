import React, { useEffect } from 'react';
import {
  Avatar,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
  useColorMode,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { faker } from '@faker-js/faker';
import { useSelector } from 'react-redux';
import { ProfileCondition } from 'utils/ProfileCondition';
import config from 'config/index.json';
import FollowBTN from './FollowBTN';
import Followers from './Followers';

interface Props {}

const { IMAGES_URL } = config;

const Head: React.FC<Props> = () => {
  const [followers, setFollowers] = React.useState<number>(0);
  const { colorMode } = useColorMode();
  const [isMinThan768] = useMediaQuery('(max-width : 768px)');

  const me = useSelector((state: any) => state.User.user);
  const profile = useSelector((state: any) => state.Profile.profile);

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
      flexFlow={isMinThan768 ? 'column' : 'row'}
    >
      <Center flex={4}>
        <Avatar
          src={
            ProfileCondition(me?.username, profile?.username) ? IMAGES_URL + me?.profile : IMAGES_URL + profile?.profile
          }
          size="2xl"
        />
      </Center>
      <VStack flex={8}>
        <Heading as="h3" fontSize="lg">
          {profile.name ? profile.name : profile.username}
        </Heading>
        <Text px="3">{profile.bio}</Text>
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
        <FollowBTN onClick={handleUpdateFollowers} />
      </VStack>
    </Flex>
  );
};

export default Head;
