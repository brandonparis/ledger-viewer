import React from 'react';
import logo from './logo.svg';
import { Main } from '@aragon/ui'
import { Button } from '@aragon/ui'
import './App.css';

function App() {
  return (
    <Main>    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button>Hello world</Button>
          Learn React
      </header>
    </div>
    </Main>

  );
}

export default App;
