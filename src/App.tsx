import React from 'react';
import { Header } from 'semantic-ui-react';

import { Timer } from './Components/Timer/Timer';


function App() {
  return (
    <div className="App">
      <Header as='h1'>Pomodoro Timer</Header>
      <Timer />
    </div>
  );
}

export default App;
