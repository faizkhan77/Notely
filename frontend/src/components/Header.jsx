import React from 'react'
import LogoutButton from './LogoutButton'
import { AuthContext } from '../AuthContext'
import { useContext } from 'react'
import notelyicon from "../assets/notely-icon.png"

const Header = () => {
    const { user } = useContext(AuthContext); // Access user data from context
    return (
        <>

            <div className="app-header">
                {/* Wrapper for icon and text */}
                <div className="app-header-logo">
                    <img
                        src={notelyicon}
                        alt="Notely Icon"
                        style={{
                            height: "30px",
                            transform: "scale(1.5)"
                        }}
                    />
                    <h1>Notely</h1>
                </div>

                {/* Conditionally render LogoutButton only if the user is logged in */}
                {user ? <LogoutButton /> : null}
            </div>

        </>
    )
}

export default Header