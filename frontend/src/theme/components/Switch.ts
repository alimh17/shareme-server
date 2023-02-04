import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(switchAnatomy.keys);

const mode = definePartsStyle({
  thumb: {
    bg: 'transparent',
    position: 'relative',
    top: '0.2',
    borderRadius: '100',
    _checked: {
      bg: 'transparent',
      position: 'relative',
      left: '2',
    },
  },
  track: {
    bg: 'dark500',
    w: '10',
    p: '2',
    _after: {
      content: `"🌙"`,
      position: 'relative',
      fontSize: '20',
      right: '20px',
      top: '8px',
    },
    _checked: {
      _after: { content: `"☀️"`, position: 'relative', fontSize: '20', right: '-8px', top: '10px' },
      bg: 'gray.300',
    },
  },
});

export const SwitchStyles = defineMultiStyleConfig({ variants: { mode } });
