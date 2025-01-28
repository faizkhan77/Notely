import React from 'react'
import { Link } from 'react-router'

const ListItem = ({ note }) => {

    // func to get title from individual note
    const getTitle = (note) => {
        // split by '\n' and get the first one
        let title = note.body.split("\n")[0]
        // if the title length is greater than 40
        if (title.length > 40) {
            // then slice it down to 0 to 40
            return title.slice(0, 40)
        }
        return title
    }

    const getTime = (note) => {
        return new Date(note.updated).toLocaleDateString()
    }

    const getContent = (note) => {
        let title = getTitle(note)
        let content = note.body.replaceAll("\n", " ")
        content = content.replaceAll(title, "")

        if (content.length > 40) {
            return content.slice(0, 45) + "..."
        } else {
            return content
        }
    }

    return (
        <>
            <Link to={`/note/${note.id}`}>
                <div className="notes-list-item">
                    <h3>{getTitle(note)}</h3>

                    <p><span>{getTime(note)}</span>{getContent(note)}</p>
                </div>
            </Link>

        </>
    )
}

export default ListItem