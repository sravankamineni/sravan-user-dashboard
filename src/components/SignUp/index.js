import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import axios from 'axios';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import { useNavigate, Link } from 'react-router-dom';
import "./index.css"
const SignUp = () => {
    const [formData, setFormData] = useState({
        user_firstname: '',
        user_email: '',
        user_password: '',
        user_phone: ''
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
        if (!formData.user_firstname) formErrors.user_firstname = "First name is required";
        if (!formData.user_email) {
            formErrors.user_email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
            formErrors.user_email = "Email address is invalid";
        }
        if (!formData.user_password) formErrors.user_password = "Password is required";
        if (!formData.user_phone) {
            formErrors.user_phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.user_phone)) {
            formErrors.user_phone = "Phone number is invalid";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const payload = {
                ...formData,
                user_lastname: 'Kamineni',
                user_city: 'Hyderabad',
                user_zipcode: '500072'
            };
            try {
                const response = await axios.post('https://syoft.dev/Api/user_registeration/api/user_registeration', payload);
                console.log(response)
                if (response.data.status) {
                    navigate('/login');
                }
                else{
                    alert(response.data.msg)
                }
            } catch (error) {
                console.error('Error during sign up:', error);
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
                <h2 className='form-head'>Sign Up</h2>
                <p className='re'>Already have an account? <Link className='link' to="/login">Login</Link></p>
                <form className='my-form' onSubmit={handleSubmit}>
                    <div className='input-cont'>
                        <label htmlFor='user_firstname' className='label'>First Name:</label>
                        <input className='input' type="text" name="user_firstname" value={formData.user_firstname} onChange={handleChange} />
                        {errors.user_firstname && <span className='err-msg'>{errors.user_firstname}</span>}
                    </div>
                    <div className='input-cont'>
                        <label htmlFor='user_email' className='label'>Email:</label>
                        <input className='input' type="email" name="user_email" value={formData.user_email} onChange={handleChange} />
                        {errors.user_email && <span className='err-msg'>{errors.user_email}</span>}
                    </div>
                    <div className='input-cont'>
                        <label htmlFor='user_password' className='label'>Password:</label>
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
                    <div className='input-cont'>
                        <label htmlFor='user_phone' className='label'>Phone:</label>
                        <input className='input' type="text" name="user_phone" value={formData.user_phone} onChange={handleChange} />
                        {errors.user_phone && <span className='err-msg'>{errors.user_phone}</span>}
                    </div>
                    <button className='btn' type="submit">Sign Up</button>
                </form>
            </div>
        </div>

    );
};

export default SignUp;
