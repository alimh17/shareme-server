import React, { useState, useEffect } from 'react';
import {
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { BsFillGridFill } from 'react-icons/bs';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import Post from 'components/Post';
import { useSelector } from 'react-redux';
import getUserPostsRequest from 'server/getUserPostsRequest';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from 'react-router-dom';

import config from 'config/index.json';

const { IMAGES_URL } = config;

interface Props {}

const Posts: React.FC<Props> = () => {
  const [isMaxThan1200] = useMediaQuery('(min-width : 1200px)');
  const user = useSelector((state: any) => state.Profile.profile);

  const { pathname } = useLocation();

  const [posts, setPosts] = useState<{}[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    getUserPostsRequest(page, user?.username).then((data) => {
      setPosts(data?.posts);
      setHasMore(data.next);
      data.next ? setPage(page + 1) : setPage(0);
    });
  }, [user, pathname]);

  const fetchData = async (): Promise<any> => {
    try {
      const data = await getUserPostsRequest(page, user?.username);
      setPosts([...posts, ...data.posts]);
      setPage(page + 1);
      if (!data.next) {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Tabs
      isFitted
      variant="enclosed"
      sx={{
        w: '100%',
        my: '5',
      }}
    >
      <TabList mb="1em">
        <Tab>
          <AiOutlineUnorderedList />
        </Tab>
        <Tab>
          <BsFillGridFill />
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <VStack mb="20">
            <InfiniteScroll
              dataLength={posts?.length}
              hasMore={hasMore}
              next={fetchData}
              inverse={true}
              loader={
                <Center my="5">
                  <Button onClick={() => fetchData()} style={{ textAlign: 'center' }}>
                    More
                  </Button>
                </Center>
              }
            >
              <Flex flexFlow="column" gap={5}>
                {posts?.map((post: any) => (
                  <Post post={post} key={post._id} />
                ))}
              </Flex>
            </InfiniteScroll>
          </VStack>
        </TabPanel>
        <TabPanel>
          <Grid templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(2, 1fr)' }} gap={6}>
            {posts?.map((post: any) => (
              <GridItem key={post._id}>
                {post.media[0].source.slice(-3) === 'mp4' ? (
                  <video src={IMAGES_URL + post.media[0].source} />
                ) : (
                  <Image src={IMAGES_URL + post.media[0].source} alt={post._id} />
                )}
              </GridItem>
            ))}
          </Grid>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Posts;
