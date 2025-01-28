import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate, NavLink } from 'react-router';
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';
import { FaArrowLeft } from "react-icons/fa";

const Login = () => {
    // formData stores the username and password entered by the user.
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // State to track loading
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Use login function from AuthContext

    // Updates formData dynamically when the user types in the form fields.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, // Keep other form fields unchanged
            [name]: value, // Update the field that changed
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.username || !formData.password) {
            setError('Please fill out all fields.');
            return;
        }
        setIsLoading(true); // Set loading to true

        try {
            // Sends a POST request to the /api/login/ endpoint.
            const response = await fetch('/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Includes the username and password as JSON in the request body.
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Use the login function from AuthContext
                login(data.tokens.access, { username: formData.username });

                console.warn(data.tokens);

                // Redirect to the home page
                navigate('/notes');
            } else {
                // Handle errors
                setError(data.error || 'Invalid login credentials.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false); // Set loading to false after request
        }

        console.warn(formData);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-heading">Login</h2>
                {error && <div className="error-message">{error}</div>}
                <form className="login-form" onSubmit={handleSubmit}>
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
                        {isLoading ? <div className="loader"></div> : "Login"}
                    </button>
                </form>
                <p className="login-footer">
                    Don't have an account? <Link to={"/signup"}>Sign Up</Link>
                </p>
                <p className="login-footer" style={{ marginTop: "15px" }}>
                    <NavLink to={"/"} className="go-back-icon">
                        <FaArrowLeft />
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;
