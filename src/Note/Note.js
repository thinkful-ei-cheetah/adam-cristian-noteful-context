import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import AppContext from '../Context/AppContext';

function deleteNoteRequest(noteId, callback) {
  const deleteURL = `http://localhost:9090/notes/${noteId}`
  
  fetch(deleteURL, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(error => {
        throw error
      })
    }
    return res.json()
  })
  .then(data => {
    callback(noteId)
  })
  .catch(error => alert(error))

}

export default class Note extends React.Component {

  render() {
    return (
      <AppContext.Consumer>
        { (context) => ( <div className='Note'>
          <h2 className='Note__title'>
            <Link to={`/note/${this.props.id}`}>
              {this.props.name}
            </Link>
          </h2>
          <button 
            className='Note__delete' 
            type='button'
            onClick={() => {
              deleteNoteRequest(this.props.id, context.delete)
            }}>
            <FontAwesomeIcon icon='trash-alt' />
            {' '}
            <NavLink to={'/'}>remove</NavLink>
          </button>
          <div className='Note__dates'>
            <div className='Note__dates-modified'>
              Modified
              {' '}
              <span className='Date'>
                {format(this.props.modified, 'Do MMM YYYY')}
              </span>
            </div>
          </div>
        </div>
        )}
      </AppContext.Consumer>
    )
  }
}
