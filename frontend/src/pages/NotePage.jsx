import React from 'react'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import ArrowLeft from '../assets/arrow-left.svg'
import { Link, useNavigate } from 'react-router'
import { useNotes } from '../NotesContext'

const NotePage = () => {
    const { notes, setNotes, fetchNotes } = useNotes();
    const params = useParams();
    const { id } = params;
    const [note, setNote] = useState({ body: "" });
    const [loading, setLoading] = useState(true); // Loading state
    const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            getNote();  // Fetch notes only if token is present
        } else {
            console.log("No token found, user might be logged out");
        }
    }, [token]);

    const getNote = async () => {
        try {
            if (id === "new") {
                setLoading(false); // No need to fetch, just set loading to false
                return;
            }
            let response = await fetch(`/api/notes/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                let data = await response.json();
                setNote(data);
            } else {
                console.error("Error fetching note:", response.statusText);
                setNote({ body: "" }); // Handle empty or invalid response
            }
        } catch (error) {
            console.error("Error fetching note:", error);
        } finally {
            setLoading(false); // Set loading to false after the operation
        }
    };

    const createNote = async () => {
        try {
            let response = await fetch(`/api/notes/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(note),
            });

            if (response.ok) {
                fetchNotes(); // Trigger notes fetch after creating a note
                navigate("/notes"); // Navigate to the notes list page
            } else {
                console.error("Error creating note:", response.statusText);
            }
        } catch (error) {
            console.error("Error creating note:", error);
        }
    };

    const updateNote = async () => {
        try {
            let response = await fetch(`/api/notes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(note),
            });

            if (response.ok) {
                fetchNotes(); // Trigger notes fetch after updating a note
                navigate("/notes"); // Navigate to the notes list page
            } else {
                console.error("Error updating note:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    const deleteNote = async () => {
        try {
            let response = await fetch(`/api/notes/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                fetchNotes(); // Trigger notes fetch after deleting a note
                navigate("/notes"); // Navigate to the notes list page
            } else {
                console.error("Error deleting note:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    // Handle submit logic
    const handleSubmit = () => {
        if (id !== "new" && !note.body) {
            deleteNote();
        } else if (id !== 'new') {
            updateNote();
        } else if (id === "new" && note.body !== "") {
            createNote();
        } else if (id === "new" && !note.body) {
            navigate("/notes")
        }
    };

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <img src={ArrowLeft} alt="Arrow Left" onClick={handleSubmit} />
                </h3>
                {id !== "new" ? (
                    <button className="delete-btn" onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>

            {loading ? (
                <div className="loading-animation">Loading...</div>
            ) : (
                <textarea
                    onChange={(e) => setNote({ ...note, body: e.target.value })}
                    value={note?.body || ""}
                    placeholder="Start typing your note..."
                />
            )}
        </div>
    );
};


export default NotePage