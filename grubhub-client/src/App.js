import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main.js'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
