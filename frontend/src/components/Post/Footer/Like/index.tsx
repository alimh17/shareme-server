import React, { useEffect, useState } from 'react';
import { Avatar, AvatarGroup, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import removeLikeRequest from 'server/LikeRequest/removeLikeRequest';
import addLikeRequest from 'server/LikeRequest/addLikeRequest';
import isLikeRequest from 'server/LikeRequest/IsLikeRequest';

import config from 'config/index.json';

const { IMAGES_URL } = config;

interface Porps {
  post: any;
}

const Like: React.FC<Porps> = ({ post }): JSX.Element => {
  const [like, setLike] = useState<boolean>(false);
  const user = useSelector((state: any) => state.User.user);

  useEffect(() => {
    if (user) {
      isLikeRequest(user?.username, post._id).then((res) => {
        setLike(res.data.status);
      });
    }
  }, [user]);

  return (
    <VStack>
      <IconButton
        variant="ghost"
        color={like ? 'red.500' : 'none'}
        size="lg"
        fontSize="24"
        aria-label="Like"
        icon={like ? <HiHeart /> : <HiOutlineHeart />}
        onClick={() => {
          if (like) {
            setLike(false);
            removeLikeRequest(user.username, post._id, post.owner.name).then((res) => {});
          } else {
            setLike(true);
            addLikeRequest(user.username, post._id, post.owner.name).then((res) => {});
          }
        }}
      />
      <HStack>
        <AvatarGroup size="xs" max={2}>
          {post?.like.map((user: any) => (
            <Avatar key={user._id} name={user.username} src={IMAGES_URL + user.profile} />
          ))}
        </AvatarGroup>
      </HStack>
      {post.like.lenght > 0 && <Text>Liked by ${post.like[0].username}</Text>}
      {/* <Text p="3">11</Text> */}
    </VStack>
  );
};

export default Like;
