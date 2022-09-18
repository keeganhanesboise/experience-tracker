import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();

  function handleClick() {
    localStorage.removeItem('token');
    setEmail();
    setUsername();
    setLoggedIn(false);
  }

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('token') != 'undefined') {
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
      {loggedIn ? 
        <div>
        <h2>User Info:</h2>
        Username: <strong>{username}</strong><br></br>
        Email: <strong>{email}</strong><br></br>
        <button onClick={handleClick}>log out</button>
        </div> 
        : 
        <div>
          <Link to="/login"><button>Log in</button></Link>
          <Link to="/register"><button>Sign up</button></Link>
        </div>
      }
    </div>
  );
}

export default App;
