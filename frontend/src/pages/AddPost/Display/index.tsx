import React from 'react';
import { Box, Button, Flex, IconButton, Image, ScaleFade } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import { HiOutlineArrowLeft } from 'react-icons/hi';

interface DisplayProps {
  paths: any[];
  onAcitve: (active: string) => void;
}

const Display: React.FC<DisplayProps> = ({ paths, onAcitve }) => {
  const handleCheckType = () => {
    return Object.keys(paths[0]).map((item, i) => {
      if (item.slice(0, 5) === 'image') {
        return (
          <SwiperSlide
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Image src={paths[0][`image${i}`]} style={{ objectFit: 'contain' }} />
          </SwiperSlide>
        );
      } else {
        return (
          <SwiperSlide
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <video src={paths[0][`video${i}`]} controls style={{ objectFit: 'contain' }} />
          </SwiperSlide>
        );
      }
    });
  };
  return (
    <>
      <Swiper
        style={{
          width: '100%',
          height: '30rem',
          display: 'flex',
          alignItems: 'center',
          padding: '8px',
        }}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
      >
        {handleCheckType()}
      </Swiper>
      <Flex p="5" w="100%" justifyContent="flex-end">
        <Button colorScheme="blue" onClick={() => onAcitve('Form')}>
          Next
        </Button>
      </Flex>
      <IconButton
        aria-label="Prev"
        icon={<HiOutlineArrowLeft />}
        sx={{ position: 'absolute', top: '2', left: '2' }}
        onClick={() => onAcitve('Files')}
      />
    </>
  );
};

export default Display;
