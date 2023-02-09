import React from 'react';
import { Grid, GridItem, Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery, VStack } from '@chakra-ui/react';
import { BsFillGridFill } from 'react-icons/bs';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import Post from 'components/Post';
import { useSelector } from 'react-redux';

interface Props {}

const Posts: React.FC<Props> = () => {
  const [isMaxThan1200] = useMediaQuery('(min-width : 1200px)');
  const user = useSelector((state: any) => state.Profile.profile);

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
            {user?.posts?.map((post: any) => (
              <Post key={post._id} post={post} />
            ))}
          </VStack>
        </TabPanel>
        <TabPanel>
          {/* <Grid templateColumns={isMaxThan1200 ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'} gap={6}>
            <GridItem h="md">
              <Post height="35rem" />
            </GridItem>
            <GridItem>
              <Post height="35rem" />
            </GridItem>
            <GridItem>
              <Post height="35rem" />
            </GridItem>
            <GridItem>
              <Post height="35rem" />
            </GridItem>
            <GridItem>
              <Post height="35rem" />
            </GridItem>
          </Grid> */}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Posts;
