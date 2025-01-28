import React from 'react'
import { Link } from 'react-router'
import AddIcon from '../assets/add.svg'

const AddButton = () => {
    return (
        <>
            <Link to={"/note/new"}>
                <img src={AddIcon} alt="Add Icon" className='floating-button' />
            </Link>
        </>
    )
}

export default AddButton