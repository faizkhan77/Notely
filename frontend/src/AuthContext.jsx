import { createContext, useState, useEffect } from 'react';

// Create the AuthContext
// Creates a new context object that can be used to share authentication-related data (authToken and user) across your app without prop-drilling.
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    //authToken stores the user's access token, The initial value is set by checking localStorage for a saved token. If no token is found, it defaults to null.
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') || null);

    // user stores the logged-in user's information (e.g., username).
    const [user, setUser] = useState(() => {
        // The initial value checks localStorage for stored user data. If found, it's parsed from JSON; otherwise, it's null.
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });


    // Whenever authToken or user changes, If authToken exists, it is saved to localStorage. If not, it's removed. Similarly, if user exists, it is saved as a JSON string in localStorage. If not, it's removed.
    useEffect(() => {
        // Sync state with localStorage
        if (authToken) {
            localStorage.setItem('authToken', authToken);
        } else {
            localStorage.removeItem('authToken');
        }

        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [authToken, user]);


    // login updates the authToken and user state when a user logs in. This triggers the useEffect to sync the data with localStorage
    const login = (token, userData) => {
        setAuthToken(token); // Set the token in the state.
        setUser(userData);  // Set the user data in the state.
    };

    const logout = () => {
        setAuthToken(null); // Clears the token from the state.
        setUser(null); // Clears the user data from the state.
    };

    return (
        // Wraps the children components and provides access to the authToken, user, and helper functions (login, logout).
        <AuthContext.Provider value={{ authToken, setAuthToken, user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
