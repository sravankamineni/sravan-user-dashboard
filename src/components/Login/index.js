import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Sidebar from '../Sidebar';
import "./index.css"
const Login = () => {
    const [formData, setFormData] = useState({
        user_email: '',
        user_password: ''
    });
    const [errors, setErrors] = useState({});
    const [isShow, setShow] = useState(false)
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.user_email) {
            formErrors.user_email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
            formErrors.user_email = "Email address is invalid";
        }
        if (!formData.user_password) formErrors.user_password = "Password is required";
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post('https://syoft.dev/Api/userlogin/api/userlogin', formData);
                console.log(response)
                if (response.data.status) {
                    localStorage.setItem('user', JSON.stringify(response.data.user_data[0]));
                    alert("Login Successful")
                    navigate('/dashboard');
                }
                else {
                    alert(response.data.msg);
                }
            } catch (error) {
                alert(error);
            }
        }
    };

    const handleToggle = () => {
        setShow(!isShow)
    }

    const inputType = isShow ? 'text' : 'password'

    return (
        <div className='signup-container'>
            <Sidebar />
            <div className="form-container">
                <h2 className='form-head'>Log In</h2>
                <p className='re'>Don't have an account? <Link className='link' to="/signup">Create One</Link></p>
                <form className='my-form' onSubmit={handleSubmit}>
                    <div className='input-cont'>
                        <label className='label'>Email:</label>
                        <input className='input' type="email" name="user_email" value={formData.user_email} onChange={handleChange} />
                        {errors.user_email && <span className='err-msg'>{errors.user_email}</span>}
                    </div>
                    <div className='input-cont'>
                        <label className='label'>Password:</label>
                        <div style={{ position: 'relative' }}>
                            <input className='input' type={inputType} name="user_password" value={formData.user_password} onChange={handleChange} />
                            <span style={{
                                position: 'absolute',
                                right: 10,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer'
                            }} onClick={handleToggle} >
                                {isShow ? <IoEyeOffOutline size={25} /> : <IoEyeOutline size={25} />}
                            </span>

                        </div>

                        {errors.user_password && <span className='err-msg'>{errors.user_password}</span>}
                    </div>
                    <button className='btn' type="submit">Log In</button>
                </form>
            </div>
        </div>

    );
};

export default Login;
