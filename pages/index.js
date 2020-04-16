import { useState, useRef } from 'react';

import Map from '../components/Map.js'
import Note from '../components/Note.js'


export default () => {

  // for the note component
  const inputRef = useRef();
  const [task, setTask] = useState(""); 

  return (
      <div>
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