import React, { createContext, useContext, useState, useEffect } from 'react';

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('authToken');

    useEffect(() => {
        if (token) {
            fetchNotes();
        }
    }, [token]);

    const fetchNotes = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/notes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <NotesContext.Provider value={{ notes, setNotes, loading, fetchNotes }}>
            {children}
        </NotesContext.Provider>
    );
};
