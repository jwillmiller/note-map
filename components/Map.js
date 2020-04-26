import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import BasicPin from './BasicPin.js';
import PinnedNote from './PinnedNote.js';
import styles from './Map.module.css'

const API_KEY = process.env.GMAPS_API_KEY;

const Marker = (props) => {
    // tip of the pin is the 'center' of the marker
    const MarkerStyle = {
        position: 'absolute',
        transform: 'translate(-50%, -100%)'
    }

    return (
        <React.Fragment>
            <BasicPin
                style = {MarkerStyle}
                color = {props.color}
                lat = {props.lat}
                lng = {props.lng}
            />
            {props.showNote && (
                <PinnedNote/>
            )}
        </React.Fragment>
    )
}


class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            center: [37.78, -122.43],
            zoom: 11,
            draggable: true,
            lat: 37.78,
            lng: -122.43,
            markers: [],
        };

        // for callbacks
        this.onChildInteractionCallback = this.onChildInteractionCallback.bind(this);
        this.onChildUpCallback = this.onChildUpCallback.bind(this);
        this._onChildClick = this._onChildClick.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    //static propTypes = {};
    //static defaultProps = {};

    // add pin button
    addMarker = (e) => {
        this.setState((prevState) => ({
            markers: [...prevState.markers, {lat: prevState.center.lat, lng: prevState.center.lng, showNote: false}],
        }));
    }

    // GMaps API callback to allow draggable markers.
    // When child element (marker) is interacted with, is location is updated
    // with the mouse.
    onChildInteractionCallback(childKey, childProps, mouse) {
        // fix map in place
        this.setState({draggable: false,});

        // update lat, lng of marker that was clicked
        let markers = [...this.state.markers]; // shallow copy array
        let marker = {...markers[childKey]}; // shallow copy element to modify
        marker.lat = mouse.lat; // update position
        marker.lng = mouse.lng; //
        markers[childKey] = marker; // replace element in array
        this.setState({markers: markers});

        // logging
        console.log('onChildInteractionCallback called with', childKey, childProps, mouse);
    }

    // GMaps API callback for end of marker-dragging event
    // On mouse up, map becomes draggable again
    onChildUpCallback(childKey, childProps, mouse) {
        this.setState({draggable: true});

        // logging
        console.log('onChildUpCallback called with', childKey, childProps, mouse);
    }

    _onChildClick = (childKey, childProps) => {
        let show = true; // assume the note is NOT showing
        if (this.state.markers[childKey].showNote === true) { // if it is showing, we stop it
            show = false;
        }

        // update showNote prop of marker that was clicked
        let markers = [...this.state.markers]; // shallow copy array
        let marker = {...markers[childKey]}; // shallow copy element to modify
        marker.showNote = show; // show note
        markers[childKey] = marker; // replace element in array
        this.setState({markers: markers});
    }

    // GMaps API callback allowing map to be dragged and zoomed
    _onChange = ({center, zoom}) => {
        this.setState({
            center: center,
            zoom: zoom,
        });
    }

    render() {
        return (
            <div>
                <button onClick={ this.addMarker }>Add new pin</button>
                <div className={styles.mapContainerStyle}>
                    <GoogleMapReact 
                        bootstrapURLKeys={{ key: API_KEY }}
                        draggable={this.state.draggable}
                        onChange={this._onChange}
                        center={this.state.center}
                        zoom={this.state.zoom}
                        onChildMouseDown={this.onChildInteractionCallback}
                        onChildMouseUp={this.onChildUpCallback}
                        onChildMouseMove={this.onChildInteractionCallback}
                        onChildClick={this._onChildClick}
                        onClick={() => console.log('mapClick')}
                    >
                        {this.state.markers.map((val, idx) => 
                            (<Marker
                                key = {idx} // int value
                                color = "secondary" // red
                                lat = {val.lat}
                                lng = {val.lng}
                                showNote = {val.showNote}
                            />)
                        )}
                    </GoogleMapReact>
                </div>
            </div> 
        );
    }
}

export default Map;