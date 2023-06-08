import React from 'react';
import { MainRouter } from './router/MainRouter';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';


const App: React.FC = () => {
  const queryClient = new QueryClient()
  return(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MainRouter />
      </QueryClientProvider>
    </BrowserRouter>
  )
};

export default App;