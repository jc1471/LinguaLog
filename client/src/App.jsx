import './App.css'
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from 'react-router';
import Dashboard from './components/Dashboard';
import LoginOrRegister from './components/LoginOrRegister';
import { API_URL } from "./config";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/api/test`)
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error(err));
  }, []);

  return (
      <div className="App">
        <header className="app-header">LinguaLog</header>
      <main>
          <h2>Backend says: {message}</h2>
          {isLoggedIn ? <Dashboard /> : <LoginOrRegister setIsLoggedIn={setIsLoggedIn} />}
        </main>
      </div>
  )
}

export default App
