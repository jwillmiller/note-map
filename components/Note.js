import React, { useState, useEffect } from 'react';

const Note = ({
  childRef,
  text,
  type,
  placeholder,
  children,
  ...props 
}) => {

  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  // event handler
  const handleKeyDown = (event, type) => {
    const { key } = event;
    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey];

    // for textarea only escape and tab change the state
    // for all others, escape, tab or enter will change the state
    if (
      (type === "textarea" && keys.indexOf(key) > -1) ||
      (type !== "textarea" && allKeys.indexOf(key) > -1)
    ) {
      setEditing(false);
    }
  };

  return (
    <section {...props}>
      {isEditing ? ( // if isEditing, display children (input or textarea)
        <div onBlur={() => setEditing(false)}
        onKeyDown={e => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : ( // else, display a label (placeholder)
        <div onClick={() => setEditing(true)}
        >
          <span>
            {text || placeholder || "Editable content"}
          </span>
        </div>
      )}
    </section>
  );
};


export default Note;