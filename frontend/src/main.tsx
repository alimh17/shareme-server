import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { RouterProvider } from 'react-router-dom';

import router from 'routes';
import theme from 'theme';
import { Provider } from 'react-redux';
import store from 'store';
import Gourd from 'HOC/Guard';

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
          <RouterProvider router={router} />
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
