import { Button, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import followRequest from 'server/FollowRequest/followRequest';
import isFollow from 'server/FollowRequest/isFollow';
import { unfollowRequest } from 'server/FollowRequest/unfollowRequest';
import { DecreaseFollowing, IncreaseFollowings } from 'store/UserSlice';
import { ProfileCondition } from 'utils/ProfileCondition';

interface Props {
  onClick: (params: string) => void;
}

const FollowBTN: React.FC<Props> = ({ onClick }): JSX.Element => {
  const [isFollowed, setIsFollowed] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const me = useSelector((state: any) => state.User.user);
  const profile = useSelector((state: any) => state.Profile.profile);

  React.useEffect(() => {
    if (profile) {
      isFollow(profile).then((res: any) => {
        if (res.data.status) {
          setIsFollowed(true);
        } else {
          setIsFollowed(false);
        }
      });
    }
  }, [profile]);

  return (
    <>
      {!ProfileCondition(me?.username, profile?.username) && (
        <HStack justifyContent="flex-end" p="3" w="74%">
          <Button
            variant={isFollowed ? 'outline' : 'solid'}
            colorScheme="blue"
            w="100%"
            onClick={() => {
              if (isFollowed) {
                setIsFollowed(false);
                unfollowRequest(profile);
                dispatch(DecreaseFollowing());
                onClick('min');
              } else {
                setIsFollowed(true);
                followRequest(profile);
                dispatch(IncreaseFollowings());
                onClick('plus');
              }
            }}
          >
            {isFollowed ? <Text>Unfollow</Text> : <Text>Follow</Text>}
          </Button>
        </HStack>
      )}
    </>
  );
};

export default FollowBTN;
