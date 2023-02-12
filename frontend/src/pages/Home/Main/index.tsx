import React, { useState, useEffect } from 'react';
import { Box, Button, Center, Container, Flex } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from 'components/Post';
import getPostsRequest from 'server/getPostsRequest';

const Main: React.FC = (): JSX.Element => {
  const [posts, setPosts] = useState<{}[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    getPostsRequest(page).then((data) => {
      setPosts(data.posts);
      setHasMore(data.next);
      data.next ? setPage(page + 1) : setPage(0);
    });
  }, []);

  const fetchData = async (): Promise<any> => {
    try {
      const data = await getPostsRequest(page);
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
    <Container
      sx={{
        marginTop: '12px',
        gap: '5',
        mb: '24',
        justifyContent: 'center',
      }}
      maxW={{ base: '100%', md: '600' }}
      flex={{ base: '6', md: '6', lg: '4' }}
      centerContent
    >
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
    </Container>
  );
};

export default Main;
