import React, { useState } from 'react';
import { CardBody, Center, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { faker } from '@faker-js/faker';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import config from 'config/index.json';

const { IMAGES_URL } = config;

interface Props {
  post: any;
}

const Body: React.FC<Props> = ({ post }): JSX.Element => {
  const [line, setLine] = useState<number>(2);

  return (
    <CardBody sx={{ zIndex: '0' }}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '8px',
        }}
        pagination={true}
        spaceBetween={50}
        slidesPerView={1}
      >
        {post?.media.map((media: any) => {
          return media.source.slice(-3) === 'mp4' ? (
            <SwiperSlide key={media._id}>
              <video src={media.source.slice(0, 4) === 'http' ? media.source : IMAGES_URL + media.source} controls />
            </SwiperSlide>
          ) : (
            <SwiperSlide key={media._id}>
              <Image
                src={media.source.slice(0, 4) === 'http' ? media.source : IMAGES_URL + media.source}
                sx={{ zIndex: '2' }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* <Image src={faker.image.image()} alt={faker.name.fullName()} borderRadius="sm" loading="lazy" /> */}
      <VStack>
        <Text fontFamily="inherit" noOfLines={line} fontSize="md" w="100%" px="2" py="4" lineHeight={1.5}>
          {post?.description}
          {/* <pre style={{ fontFamily: 'inherit' }}></pre> */}
        </Text>
        <Text textAlign="left" w="100%" onClick={() => (line === 2 ? setLine(300) : setLine(2))}>
          {line === 2 ? 'See more...' : 'See Less...'}
        </Text>
      </VStack>
    </CardBody>
  );
};

export default Body;
