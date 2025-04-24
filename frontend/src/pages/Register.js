import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
        surname: '',
        country: '',
    });

    const navigate = useNavigate();

    const { username, email, password, name, surname, country } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/register', formData);
            console.log(res.data);
            navigate('/login');
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={onChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                />
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChange}
                    required
                />
                <input
                    type="text"
                    name="surname"
                    value={surname}
                    onChange={onChange}
                    required
                />
                <input
                    type="text"
                    name="country"
                    value={country}
                    onChange={onChange}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;