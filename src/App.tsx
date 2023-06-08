import React from 'react';
import { MainRouter } from './router/mainRouter';
import { BrowserRouter } from 'react-router-dom';


const App: React.FC = () => {
  return(
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  )
};

export default App;