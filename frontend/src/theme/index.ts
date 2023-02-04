import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

import { ButtonStyles as Button } from './components/Button';
import { SwitchStyles as Switch } from './components/Switch';

const theme: ThemeConfig = extendTheme({
  styles: {
    global: (props: any) => ({
      body: {
        fontFamily: 'Vazir , sans-serif',
      },
    }),
  },
  colors: {
    primary: '#0F4C75',
    secondary: '#FC5185',
    warning: '#FFDE7D',
    success: '#76BA99',
    error: '#FF597B',
    cyan500: '#00ADB5',
    dark500: '#393E46',
    dark800: '#222831',
    gray500: '#aaaaaa',
  },
  components: {
    Button,
    Switch,
  },
});

export default theme;
