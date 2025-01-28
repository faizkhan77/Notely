import React, { useState } from 'react';
import './Signup.css';
import { Link, useNavigate, NavLink } from 'react-router';
import { FaArrowLeft } from "react-icons/fa";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // State to track loading

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (!formData.username || !formData.email || !formData.password) {
            setError('Please fill out all fields.');
            return;
        }
        setIsLoading(true); // Set loading to true

        try {
            // Send POST request to the backend
            const response = await fetch('/api/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password, // Confirm password is handled in the backend
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Redirect to the login page on successful signup
                navigate('/login');
            } else {
                // Handle errors (e.g., username/email already exists)
                setError(data.error || 'An error occurred during signup.');
            }
        }
        catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false); // Set loading to false after request
        }

        console.warn(formData)
    };


    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="signup-heading">Sign Up</h2>
                {error && <div className="error-message">{error}</div>}
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="submit-btn">
                        {isLoading ? <div className="loader"></div> : "Sign Up"}
                    </button>
                </form>
                <p className="signup-footer">
                    Already have an account? <Link to={"/login"}>Login</Link>
                </p>
                <p className="signup-footer" style={{ marginTop: "15px" }}>
                    <NavLink to={"/"} className="go-back-icon">
                        <FaArrowLeft />
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Signup;
