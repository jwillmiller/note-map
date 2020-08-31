import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { addNote, updateNoteText, updateNoteTitle, updateMapCenter, removeNote } from '../redux/actions/actions';
import NoteCard from './NoteCard';

function Sidebar(props) {

    // add pin button
    const addNote = (e) => {
        // redux action
        props.addNote(props.center[0], props.center[1]);
    }

    // on user edit redux state is updated
    const handleNoteEdit = (event, idx) => {
        props.updateNoteText(idx, event.target.value);
    }

    const handleNoteTitleEdit = (event, idx) => {
        props.updateNoteTitle(idx, event.target.value);
    }

    const handleNoteClick = (note, idx) => {
        console.log("note clicked ", idx);
        props.updateMapCenter(note.lat, note.lng);
    }

    const deleteNote = (idx) => {
        props.removeNote(idx);
    }

    const renderNotes = () => {
        return (
            props.notes.map((note, idx) => {
                return (
                    <NoteCard 
                      key={idx}
                      idx={idx}
                      title={note.title}
                      text={note.text}
                      onTitleChange={handleNoteTitleEdit}
                      onTextChange={handleNoteEdit}
                      onDelete={deleteNote}
                      onClick={() => handleNoteClick(note, idx)}
                    />
                );
            })
        )
    }

    return (
        <div className="sidebar" >
            <Button style={{width: "100%"}} type="default" onClick={addNote}>Add new note</Button>
            { renderNotes() }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        notes: state.notes,
        center: state.center,
        zoom: state.zoom
    };
}

const mapDispatchToProps = {
    addNote: addNote,
    removeNote: removeNote,
    updateNoteText: updateNoteText,
    updateNoteTitle: updateNoteTitle,
    updateMapCenter: updateMapCenter,
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);