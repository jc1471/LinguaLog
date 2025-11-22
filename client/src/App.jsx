import './App.css'
import { useState } from "react";
import { BrowserRouter as Router, Route } from 'react-router';
import Dashboard from './components/Dashboard';
import LoginOrRegister from './components/LoginOrRegister';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
      <div className="App">
        <header className="app-header">LinguaLog</header>
        <main>
          {isLoggedIn ? <Dashboard /> : <LoginOrRegister setIsLoggedIn={setIsLoggedIn} />}
        </main>
      </div>
  )
}

export default App
