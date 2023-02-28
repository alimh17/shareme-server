import React from 'react';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Container,
  Heading,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import { userRequest } from 'server/UserRequest/userRequest';
import FollowCard from './FollowCard';
import followRequest from 'server/FollowRequest/followRequest';
import { unfollowRequest } from 'server/FollowRequest/unfollowRequest';
import followingPageRequest from 'server/FollowRequest/FollowingPageRequest';
import { DecreaseFollowing, IncreaseFollowings, initUser } from 'store/UserSlice';

const FollowPage: React.FC = (): JSX.Element => {
  const [users, setUsers] = React.useState<{}[]>([]);
  const [followed, setFollowed] = React.useState<number>(0);
  const { colorMode } = useColorMode();

  const user = useSelector((state: any) => state.User.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    userRequest().then((res: any) => {
      dispatch(initUser(res.data.user));
    });
  }, []);

  React.useEffect(() => {
    if (user && user.followings > 5) {
      navigate('/');
    } else {
      followingPageRequest().then(({ data }) => {
        setUsers(data.slice(0, 10));
      });
    }
    setFollowed(user.followings);
  }, []);

  const handleClickButton = (data: any) => {
    const cpUsers = [...users];
    const findUser: any = cpUsers.find((user: any) => user._id === data._id);
    if (findUser.follow) {
      findUser.follow = false;
      setFollowed(followed - 1);
      unfollowRequest(data);
      dispatch(DecreaseFollowing());
    } else {
      findUser.follow = true;
      setFollowed(followed + 1);
      followRequest(data);
      dispatch(IncreaseFollowings());
    }
    setUsers(cpUsers);
  };

  return (
    <Container
      centerContent
      sx={{
        maxW: 990,
        mt: 5,
        bg: colorMode === 'dark' ? 'dark800' : 'white',
        boxShadow: colorMode === 'dark' ? 'none' : 'md',
        border: colorMode === 'dark' ? 'none' : '1px solid #eaeaea',
        borderRadius: 'md',
        position: 'relative',
      }}
    >
      <Heading as="h2" fontSize={24} p={5}>
        FollowPage
      </Heading>
      <Text>{followed}/10</Text>
      <Swiper
        style={{
          width: '100%',
          height: '70vh',
          display: 'flex',
          alignItems: 'center',
          padding: '8px',
        }}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation={true}
        pagination={true}
        breakpoints={{
          // when window width is >= 640px
          600: {
            slidesPerView: 1,
            navigation: false,
          },
          // when window width is >= 768px
          900: {
            slidesPerView: 3,
          },
        }}
      >
        {users?.map((item: any) => (
          <SwiperSlide
            key={item._id}
            style={{
              display: 'flex',
              flexFlow: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <FollowCard user={item} onClick={handleClickButton} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Button
        sx={{
          position: 'absolute',
          right: 1,
          bottom: 1,
          m: 2,
          zIndex: 100,
        }}
        colorScheme="blue"
        isDisabled={followed < 5 ? true : false}
        onClick={() => navigate('/')}
      >
        Next
      </Button>
    </Container>
  );
};

export default FollowPage;
