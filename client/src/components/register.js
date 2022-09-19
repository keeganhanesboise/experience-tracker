import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';

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
        .then(res => res.data.success ? handleLogin(userData) : console.log("Failed to create user"))
        .catch(err => console.log(err))
    }

    return (
        <div>
            <Navbar/>
            <div className='container'>
                <form onSubmit={e => handleRegister(e)}>
                    <div className='mb-3'>
                        <label htmlFor='emailSignup' className='form-label'>Email</label>
                        <input required type="email" className='form-control' id='emailSignup'></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='usernameSignup' className='form-label'>Username</label>
                        <input required type="username" className='form-control' id='usernameSignup'></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='passwordSignup' className='form-label'>Password</label>
                        <input required type="password" className='form-control' id='passwordSignup'></input>
                    </div>
                    <input type="submit" className='btn btn-primary' value="Register"/>        
                </form>
            </div>
        </div>
    )
}

export default Register;