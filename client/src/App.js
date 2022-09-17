import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();

  function handleClick() {
    localStorage.removeItem('token');
    setEmail();
    setUsername();
    setLoggedIn(false);
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const options = {
        method: 'get',
        url: 'http://localhost:5000/getUserInfo',
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      }
      
      axios(options)
      .then(res => {
        setUsername(res.data.username);
        setEmail(res.data.email);
      })
      .catch(err => console.log(err));
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <div className="App">
      <h1>Experience Tracker</h1>
      <h2>User Info:</h2>
      Username: <strong>{username}</strong><br></br>
      Email: <strong>{email}</strong><br></br>
      {loggedIn ? <button onClick={handleClick}>log out</button> : <Link to="/login"><button>Log in</button></Link>}
    </div>
  );
}

export default App;
