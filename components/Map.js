import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

import BasicPin from './BasicPin.js';
import { connect } from 'react-redux';
import { addNote, updateNotePosition, updateMapCenter, updateMapZoom } from '../redux/actions/actions';

const API_KEY = process.env.GMAPS_API_KEY;

const Marker = (props) => {
    // tip of the pin is the 'center' of the marker
    const MarkerStyle = {
        position: 'absolute',
        transform: 'translate(-50%, -100%)',
        height: 40,
        width: 40,
    }

    return (
        <div>
            <BasicPin
                style = {MarkerStyle}
                color = {props.color}
                lat = {props.lat}
                lng = {props.lng}
            />
        </div>
    )
}

function Map(props) {
    const [draggable, setDraggable] = useState(true);
    const [center, setCenter] = useState([]);
    const [zoom, setZoom] = useState();
    const [notes, setNotes] = useState([]);

    const _onChange = ({center, zoom}) => {
        props.updateMapCenter(center.lat, center.lng);
        props.updateMapZoom(zoom);
    }

    const onChildUpCallback = (childKey, childProps, mouse) => {
        setDraggable(true);
    }

    const onChildDragCallback = (childKey, childProps, mouse) => {
        // fix map in place
        setDraggable(false);

        // redux
        props.updateNotePosition(childKey, mouse.lat, mouse.lng);
    }

    // center map on marker that was clicked
    const _onChildClick = (childKey, childProps, mouse) => {
        let clickedNote = props.notes[childKey];
        props.updateMapCenter(clickedNote.lat, clickedNote.lng);
    }

    // state update from redux on render and props update
    useEffect(() => {
        setCenter(props.center);
        setZoom(props.zoom);
        setNotes(props.notes);
    }, [props]);

    return (
        <div className="map">
            <div className="google-map-react">
                <GoogleMapReact 
                    bootstrapURLKeys={{ key: API_KEY }}
                    draggable={draggable}
                    onChange={_onChange}
                    center={center}
                    zoom={zoom}
                    onChildMouseUp={onChildUpCallback}
                    onChildMouseMove={onChildDragCallback}
                    onChildClick={_onChildClick}
                >
                    {notes.map((val, idx) => 
                        (<Marker
                            key = {idx} // int value
                            color = "secondary" // red
                            lat = {val.lat}
                            lng = {val.lng}
                        />)
                    )}
                </GoogleMapReact>
            </div>
        </div> 
    );
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
    updateNotePosition: updateNotePosition,
    updateMapCenter: updateMapCenter,
    updateMapZoom: updateMapZoom
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);