
import './styles.css';
import './App.css';
import { useState } from 'react';
import {TicTacToe} from './apps/tictactoe/TicTacToe.jsx'
import Stories from './apps/stories/Stories.jsx'

const welcome = {
  greeting:'Hey',
  title:'React'
}

function Welcome(welcome){
  return (
    <h1>
        {welcome.greeting} {welcome.title}
    </h1>
  );
}


function App() {
  const [activeApp, setActiveApp] = useState('TicTacToe');
  return (
    <div className='app-container'>
      <div className='sidebar'>
        
        <Welcome welcome={welcome}/>
        
        <button onClick={() => setActiveApp('TicTacToe')}>Tic Tac Toe</button>
        <button onClick={() => setActiveApp('Stories')}>Stories</button>
        <button onClick={() => setActiveApp('OtraApp')}>Otra App</button>
        
        
      </div>
      <div className='main-content'>
          {activeApp ==='TicTacToe' && <TicTacToe/>}
          {activeApp ==='Stories' && <Stories/>}
          {activeApp ==='OtraApp' && <div>Proxima App aqui</div>}          
      </div>
    </div>
  )
}


export default App

