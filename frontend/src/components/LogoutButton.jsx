import React from "react";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router"; // Import useNavigate
import "./LogoutButton.css"

const LogoutButton = () => {
    const { logout } = useContext(AuthContext); // Access logout from context
    const navigate = useNavigate(); // Initialize the navigate function

    const handleLogout = () => {
        logout(); // Call the logout function from AuthContext
        navigate("/login"); // Redirect to the login page
    };

    return (
        <button onClick={handleLogout} className="logout-btn">
            Logout
        </button>
    );
};

export default LogoutButton;
