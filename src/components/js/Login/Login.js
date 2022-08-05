import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/Login.css';
import { useNavigate } from "react-router-dom";
import nodeurl from '../../../nodeServer.json'


const Login = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({});
    const [errors, setErrors] = useState({});
    const margin = { margin: '35px 0px' };
    useEffect(() => {
        window.addEventListener('keydown', (event) => {
            if (event.keyCode === 13) handleSubmit(event);
        });
    }, [])
    const handleChange = (event) => {
        var validate_UN = '', validate_PWD = '';
        input[event.target.name] = event.target.value;
        setInput(input)
        if (typeof input["email"] !== "undefined") {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
                validate_UN = "Please enter valid email address.";
            }
        }
        if (typeof input["password"] !== "undefined") {
            if (input["password"].length < 6) {
                validate_PWD = "Please add at least 6 charachter.";
            }
        }
        setErrors({ email: validate_UN, password: validate_PWD });
    }
    const Navigate = (path) => {
        navigate(path);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validate()) {
            let email = input.email;
            let password = input.password;
            var query = { query: "AB_LoginValidation '" + email + "','" + password + "'" };
            axios.post(nodeurl['nodeurl'], query)
                .then(res => {
                    var loginDetails = res.data[0][0];
                    if (loginDetails['AccStatus'] === 1) {
                        localStorage.clear();
                        localStorage.setItem('EmpId', loginDetails['EmpId']);
                        localStorage.setItem('UserName', loginDetails['UserName']);
                        localStorage.setItem('Name', loginDetails['Name']);
                        localStorage.setItem('Gender', loginDetails['Gender']);
                        localStorage.setItem('Designation', loginDetails['Designation']);
                        const color = loginDetails['Theme'].split(',');
                        localStorage.setItem('BgColor', color[0]);
                        localStorage.setItem('Color', color[1]);
                        Navigate('/Home')
                    }
                });
        }
    }

    const validate = () => {
        let isValid = true;
        var validate_UN = '', validate_PWD = '';
        if (!input["email"]) {
            isValid = false;
            validate_UN = "Please enter your email Address.";
        }
        if (typeof input["email"] !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
                isValid = false;
                validate_UN = "Please enter valid email address.";
            }
        }
        if (!input["password"]) {
            isValid = false;
            validate_PWD = "Please enter your password.";

        }
        if (typeof input["password"] !== "undefined") {
            if (input["password"].length < 6) {
                isValid = false;
                validate_PWD = "Please add at least 6 charachter.";
            }
        }
        setErrors({ email: validate_UN, password: validate_PWD })

        return isValid;
    }

    return (
        <>
            <div className="login-container">
                <div className="title">Login</div>
                <div className="input input--open" style={margin}>
                    <div className="input-holder">
                        <input type="text" onChange={handleChange} className="input-input" id="name" name="email" />
                        <div className={(errors.email ? 'text-danger' : '')}>{errors.email}</div>
                        <label className="input-label">user name</label>
                    </div></div>
                <div className="input input--open" style={margin}>
                    <div className="input-holder">
                        <input type="password" onChange={handleChange} className="input-input" id="password" name="password" />
                        <div className={(errors.password ? 'text-danger' : '')}>{errors.password}</div>
                        <label className="input-label">password</label>
                    </div></div>

                <button className="button login-button" onClick={handleSubmit}>log in</button>

            </div>
        </>
    )
}

export default Login