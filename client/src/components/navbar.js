import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Navbar() {
    const [username, setUsername] = useState();
  
    function handleLogOut() {
      localStorage.removeItem('token');
      setUsername();
      window.location.reload(false);
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
        }
      }, []);
    
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Experience Tracker</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className="offcanvas-header">
                        {localStorage.getItem('token') ? <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Hello {username}!</h5> 
                        : <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Log In or Sign Up</h5>}
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                        {localStorage.getItem('token') ? 
                            <button type="button" onClick={handleLogOut} className='btn btn-primary'>logout</button> 
                            :
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className='nav-item'>
                                <Link className='nav-link' to="/login">Log in</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to="/register">Sign up</Link>
                            </li>
                            </ul>
                        }
                        </div>
                    </div>
                </div>
            </nav>
            <nav className="navbar navbar-dark bg-dark">
                <a className="navbar-brand" href="/">Experience Tracker</a>
            </nav>
            <br></br>
        </div>
    )
}

export default Navbar;