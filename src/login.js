import React, { useState } from 'react';
import './user.css'
import './weather.css'
import Slider from '@material-ui/core/Slider';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { setLoginUser } from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Login(props) {
    const [isLogup, setIslogup] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [disable, setDisable] = useState(false)
    const [errorMessages, setErrorMessages] = useState('')
    const dispatch = useDispatch();

    const loginUser = useSelector(state => state.loginUser);
    const Validate = () => {
        // return true;
        setErrorMessages('')
        let re = ''
        re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
            if (!password) {
                setErrorMessages('email and passwrd not valid ');
            }
            else setErrorMessages('email is not valid');
            return false
        }
        if (!password) {
            setErrorMessages('passwrd is not valid ');
            return false
        }
        return true
    }

    function sendLogin() {
        {
            setDisable(true)
            const base = 'http://localhost:3000/api/v1.0';
            var t = JSON.stringify({ i: password })
            var tt = t.slice(6, t.length - 2)
            fetch(`${base}/login/${email}/${tt}`,
                {
                    // body: JSON.stringify({ lll: 'lll' }),
                    // mode: 'cors',
                    credentials: 'include',
                    method: 'POST',
                    // headers: {
                    //     'Content-Type': 'application/json',
                    // },
                })
                // axios.post(`${base}/login`, { email: email, password: p })
                // .then(r => r.json().then((data) => ({ status: r.status, body: data })))
                .then((res) => {
                    setDisable(false)
                    setErrorMessages('')
                    if (res.status != 200) {
                        setErrorMessages('One of the details is incorrect')
                        console.log('obj, obj.body');
                    }
                    else {
                        dispatch(setLoginUser(email));
                        // history.push('/main')
                    }
                })
        }
    }
    function sendLogup() {
        setDisable(true)
        const data = { email: email, password: password, username: username }
        const base = 'http://localhost:3000/api/v1.0';
        // fetch(`${base}/logup`,
        const p = password;
        fetch(`${base}/logup/${email}/${p}/${username}`,
            {
                // mode: 'cors',
                method: "POST",
                credentials: 'include',
                // body: JSON.stringify(data),
                // headers: {
                //     method: "POST",
                //     'Content-Type': 'x-www-form-urlencoded',
                // }
            }

        )
            // axios.post(`${base}/logup`,
            //     // { email: email, password: password, username: username },
            //     { email, password, username },
            //     { withCredentials: true })
            .then(r => r.json().then((data) => ({ status: r.status, body: data })))
            .then((obj) => {
                setDisable(false)
                if (obj.status == 200) {
                    setEmail('');
                    if (obj.body.code == 11000)
                        setErrorMessages('email is already exist!')
                    else {
                        setPassword('');
                        setUsername('')
                        dispatch(setLoginUser(email));
                    }
                }
                console.log(obj);
            })

    }


    return (
        <div className="main-w3layouts wrapper">
            <div className="main-agileinfo">
                <div className="agileits-top">
                    <form action="#" method="post">
                        {isLogup && <input className="text " type="text"
                            name="Username"
                            placeholder="Username"
                            required=""
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />}
                        <input className="text email"
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email"
                            required="" />
                        <input className="text w3lpass"
                            type='text' name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required="" />
                        <div className="wthree-text">
                            <label className='descraption'>{errorMessages}</label>

                            {!isLogup && < input onClick={() => { Validate() ? sendLogin() : '' }} type="button" value="SIGNIN" disabled={disable} />}
                            {isLogup && <input onClick={() => { Validate() ? sendLogup() : '' }} type="button" value="SIGNUP" disabled={disable} />}
                            {!isLogup && <label className="link" onClick={() => { setIslogup(true); setErrorMessages('') }}> New user? click here</label>}
                            {isLogup && <label className="link" type='button' onClick={() => { setIslogup(false); setErrorMessages('') }} >Are you a registered user?</label>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}



