import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
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
            localStorage.setItem('token', res.data.token)
            handleToken();
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        handleToken();
    })

    return (
        <form onSubmit={e => handleLogin(e)}>
            <input required type="username"></input>
            <input required type="password"></input>
            <input type="submit" value="Submit"/>        
        </form>
    )
}

export default Login;