import { useState, useEffect, useRef } from 'react';
import produce from "immer";

import Map from '../components/Map.js'
import Note from '../components/Note.js'

// these notes maintain state between refreshes
const PermanentNotes = props => props.data.map(note => <div>{note.text}</div>);

export default () => {
  const initialData = [{ text: 'Loading notes ... ' }];
  const [data, setData] = useState(initialData);

  const handleClick = () => {
      const text = document.querySelector('#noteinput').value.trim();
      if (text) {
        const nextState = produce(data, draftState => {
          draftState.push({ text });
        });
        document.querySelector('#noteinput').value = '';

        if (typeof window !== 'undefined') {
          localStorage.setItem('data', JSON.stringify(nextState));
        }

        setData(nextState);
      }
    };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getData = localStorage.getItem('data');

      if (getData !== '' && getData !== null) {
        return setData(JSON.parse(getData));
      }
      return setData([]);
    }
  }, 0);

  // for the note component
  const inputRef = useRef();
  const [task, setTask] = useState(""); 

  return (
      <div>
        <>
          <input id="noteinput" style={{ width: '80%' }} type="text" placeholder="Enter a new note" />
          <button onClick={() => handleClick()}>Add note</button>
          <PermanentNotes data={data} />
        </>
        <Map/>
        <Note
          text={task}
          placeholder="Write a task"
          childRef={inputRef}
          type="textarea"
        >
          <textarea
            ref={inputRef}
            name="task"
            placeholder="Write a task name"
            value={task}
            onChange={e => setTask(e.target.value)}
          />
        </Note>
      </div>
    );

};