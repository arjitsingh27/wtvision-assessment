"use client"
import React, { useState } from 'react';
import useApi from '../hooks/useApi';
import styles from '../styles/LoginForm.module.scss'

const LoginForm = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const { login } = useApi();

    const isDataValidated = (credentials) => {
        for (let key in credentials) {
            if (credentials.hasOwnProperty(key)) {
                if (credentials[key] === null || credentials[key] === undefined || credentials[key] === "") {
                    return false;
                }
            }
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isDataValidated({ username, password })) {
            const minLength = 3;
            const maxLength = 20;
            const allowedCharacters = /^[a-zA-Z0-9_.@\-+]+$/;
            if (username.length < minLength || username.length > maxLength) {
                alert(`Username must be between ${minLength} and ${maxLength} characters.`);
                return;
            }
            if (!allowedCharacters.test(username)) {
                alert("Username can only contain letters, numbers, and underscores.");
                return;
            }
            if (password.length < 5 || password.length > maxLength) {
                alert(`Password must be between 5 and ${maxLength} characters.`)
                return;
            }
            await login({ username, password })
            window.location.href = '/list'
        } else {
            alert('Fill all the fields')
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.login}>
            <h3>Login</h3>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default LoginForm;
