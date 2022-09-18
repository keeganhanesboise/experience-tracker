import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
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

    function handleLogin(userData) {
        const options = {
            method: 'post',
            url: 'http://localhost:5000/login',
            data: {
                username: userData.username,
                password: userData.password,
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

    function handleRegister(e) {
        e.preventDefault();

        const form = e.target;

        const userData = {
            email: form[0].value,
            username: form[1].value,
            password: form[2].value,
        }

        const options = {
            method: 'post',
            url: 'http://localhost:5000/register',
            data: userData,
            headers: {
                'Content-type': 'application/json'
            }
        }

        axios(options)
        .then(res => res.data.success ? handleLogin(userData) : null)
        .catch(err => console.log(err))
    }

    return (
        <form onSubmit={e => handleRegister(e)}>
            <input required type="email"/>
            <input required type="username"/>
            <input required type="password"/>
            <input type="submit" value="Register"/>
        </form>
    )
}

export default Register;