import React, { useEffect, useState } from 'react';
import { IconButton } from '@chakra-ui/react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import removeLikeRequest from 'server/LikeRequest/removeLikeRequest';
import addLikeRequest from 'server/LikeRequest/addLikeRequest';
import isLikeRequest from 'server/LikeRequest/IsLikeRequest';

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
          removeLikeRequest(user.username, post._id).then((res) => {});
        } else {
          setLike(true);
          addLikeRequest(user.username, post._id).then((res) => {});
        }
      }}
    />
  );
};

export default Like;
