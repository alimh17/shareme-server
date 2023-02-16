import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { RouterProvider } from 'react-router-dom';

import router from 'routes';
import theme from 'theme';
import { Provider } from 'react-redux';
import store from 'store';
import Refresh from 'HOC/Refresh';
import InitState from 'HOC/InitState';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const queryClient = new QueryClient();

interface IMode {
  config: {
    initialColorMode: 'dark' | 'light' | 'system' | undefined;
    useSystemColorMode: boolean;
  };
}

const mode: IMode = {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider resetCSS theme={theme}>
          <ColorModeScript initialColorMode={mode.config?.initialColorMode} />
          <Refresh>
            <RouterProvider router={router} />
          </Refresh>
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
