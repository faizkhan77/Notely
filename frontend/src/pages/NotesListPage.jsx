import React, { useState, useEffect } from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'
import { AuthContext } from '../AuthContext'
import { useContext } from 'react'
import { useNotes } from '../NotesContext'


const NotesListPage = () => {
    const { notes, loading, fetchNotes } = useNotes();
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (token) {
            fetchNotes();
        }
    }, [token]);

    return (
        <div className="notes">
            <div className="notes-header">
                <h2 className="notes-title">&#9782; Hi, {user?.username || 'Guest'}! </h2>
                <p className="notes-count">{notes.length}</p>
            </div>
            <div className="notes-list">
                {loading ? (
                    <div className="loading-animation">Loading your notes...</div>
                ) : notes.length > 0 ? (
                    notes.map((note, index) => <ListItem key={index} note={note} />)
                ) : (
                    <p>No notes available. Please add a note.</p>
                )}
            </div>

            <AddButton />
        </div>
    );
};


export default NotesListPage