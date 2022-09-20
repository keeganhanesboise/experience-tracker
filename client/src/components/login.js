import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';

function Login() {
    const [message, setMessage] = useState();
    const navigate = useNavigate();

    function handleToken() {
        const options = {
            method: 'get',
            url: 'http://localhost:5000/isUserAuth',
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }

        axios(options)
        .then(data => data.data.isLoggedIn ? navigate('/') : null)
    }

    function handleLogin(e) {
        e.preventDefault();

        const form = e.target;

        const options = {
            method: 'post',
            url: 'http://localhost:5000/login',
            data: {
                username: form[0].value,
                password: form[1].value,
            },
            headers: {
                'Content-type': 'application/json'
            }
        }

        axios(options)
        .then(res => {
            setMessage(res.data.message);
            localStorage.setItem('token', res.data.token)
            handleToken();
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        handleToken();
    })

    return (
        <div>
            <Navbar />
            <div className='container'>
                <form onSubmit={e => handleLogin(e)}>
                    <div className='mb-3'>
                        <label htmlFor='usernameLogin' className='form-label'>Username</label>
                        <input required type="username" className='form-control' id='usernameLogin'></input>
                        <small id="formHelp" className="form-text text-danger">{message}</small>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='passwordLogin' className='form-label'>Password</label>
                        <input required type="password" className='form-control' id='passwordLogin'></input>
                        <small id="formHelp" className="form-text text-danger">{message}</small>
                    </div>
                    <input type="submit" className='btn btn-primary' value="Submit"/>        
                </form>
            </div>
        </div>
    )
}

export default Login;