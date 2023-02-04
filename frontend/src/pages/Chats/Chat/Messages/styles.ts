import { useColorMode } from '@chakra-ui/react';

export const CSS = {
  '@media screen and (max-height : 700px)': {
    height: '70%',
  },
  '@media screen and (min-height : 700px)': {
    height: '75%',
  },
  '@media screen and (min-height : 800px)': {
    height: '80%',
  },
  '@media screen and (min-height : 900px)': {
    height: '84%',
  },
  '@media screen and (min-height : 1000px)': {
    height: '86%',
  },
  '@media screen and (min-height : 1300px)': {
    height: '90%',
  },
  '&::-webkit-scrollbar': {
    width: '4px',
    background: 'dark800',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#3D424A',
    borderRadius: '24px',
  },

  '&::-webkit-scrollbar-track': {
    width: '6px',
  },
};
