import './App.css';
import Navbar from './components/navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState();
  
  function handleCreateExperience(e) {
    e.preventDefault();

    const form = e.target;
    
    const options = {
      method: 'post',
      url: 'http://localhost:5000/createExperience',
      data: {
        title: form[0].value,
        location: form[1].value,
        description: form[2].value,
        user: username,
      },
      headers: {
          'Content-type': 'application/json'
      }
    }

    axios(options)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined') {
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
      })
      .catch(err => console.log(err));
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <div className="App">
      <Navbar />
      {loggedIn ? 
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-4'>
            <form onSubmit={e => handleCreateExperience(e)}>
              <div className='mb-3'>
                  <label htmlFor='experienceTitle' className='form-label'>Title</label>
                  <input required className='form-control' id='experienceTitle'></input>
              </div>
              <div className='mb-3'>
                  <label htmlFor='experienceLocation' className='form-label'>Location</label>
                  <input className='form-control' id='experienceLocation'></input>
              </div>
              <div className='mb-3'>
                  <label htmlFor='experienceDescription' className='form-label'>Description</label>
                  <input className='form-control' id='experienceDescription'></input>
              </div>
              <input type="submit" className='btn btn-primary' value="Create Experience"/>        
            </form>
            </div> 
          </div>
        </div>
        : 
        <div>
          Log in/Sign up to create experience
        </div>
      }
    </div>
  );
}

export default App;
