
import './styles.css';
import './App.css';
import { useState } from 'react';
import {TicTacToe} from './apps/tictactoe/TicTacToe.jsx'



function App() {
  const [activeApp, setActiveApp] = useState('TicTacToe');
  return (
    <div className='app-container'>
      <div className='sidebar'>
        <button onClick={() => setActiveApp('TicTacToe')}>Tic Tac Toe</button>

        <button onClick={() => setActiveApp('OtraApp')}>Otra App</button>

      </div>
      <div className='main-content'>
          {activeApp ==='TicTacToe' && <TicTacToe/>}
          {activeApp==='OtraApp' && <div>Proxima App aqui</div>}

        </div>
    </div>
  )
}




export default App

