import React, { useEffect, useState, useRef } from 'react';
import { Card } from 'antd';
import { CloseOutlined, UpSquareFilled } from '@ant-design/icons';

const CARD_BODY_PADDING = 24; // padding in px

// takes props value, onChange like normal textarea
// also takes setParentHeight for resize events
function NoteInput(props) {
    const textAreaRef = useRef(null);
    const [height, setHeight] = useState("auto");

    const resizeHandler = (event) => {
        setHeight("auto");
        props.setParentHeight(`${textAreaRef.current.scrollHeight}px`);
        
        if (props.onChange) {
            props.onChange(event);
        }
    }

    useEffect(() => {
        props.setParentHeight(`${textAreaRef.current.scrollHeight}px`);
		setHeight(`${textAreaRef.current.scrollHeight}px`);
	}, [props]);

    return (
        <div style={{height: height}}>
            <textarea 
              {...props}
              className="note-body" 
              placeholder="Write a note here"
              style={{ height: height }}
              value={props.value} 
              ref={textAreaRef}
              onChange={resizeHandler}
            />
        </div>
    )
}

// props: idx, title, text, onTitleChange, onTextChange, onDelete
function NoteCard(props) {
    const [cardBodyHeight, setCardBodyHeight] = useState("auto");

    // very hacky resize that depends on the padding value from antd
    const handleNoteResize = (newH) => {
        let calcH = 2 * CARD_BODY_PADDING + parseInt(newH);
        setCardBodyHeight(calcH.toString() + "px");
    }

    useEffect(() => {
        console.log("note idx ", props.idx, " fired");
        console.log("card body height", cardBodyHeight);
    }, []);

    return (
        <Card 
            title={<input className="note-title" value={props.title} onChange={(e) => props.onTitleChange(e, props.idx)} />}
            bordered={true} 
            hoverable={true}
            bodyStyle={{height: cardBodyHeight, marginBottom: "8px"}}
            extra={<CloseOutlined onClick={() => props.onDelete(props.idx)} />}
            onClick={() => props.onClick()}
        >
            <NoteInput
                value={props.text} 
                onChange={(e) => props.onTextChange(e, props.idx)}
                setParentHeight={(h) => handleNoteResize(h)}
            />
        </Card>
    )
}

export default NoteCard;