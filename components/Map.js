import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import BasicPin from './BasicPin.js';
import styles from './Map.module.css'

const API_KEY = process.env.GMAPS_API_KEY;

const Marker = (props) => {
    // tip of the pin is the 'center' of the marker
    const MarkerStyle = {
        position: 'absolute',
        transform: 'translate(-50%, -100%)'
    }

    return (
        <BasicPin
            style = {MarkerStyle}
            color = {props.color}
            lat = {props.lat}
            lng = {props.lng}
        />
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
        this._onChange = this._onChange.bind(this);
    }

    //static propTypes = {};
    //static defaultProps = {};

    // button stuff
    addMarker = (e) => {
        this.setState((prevState) => ({
            markers: [...prevState.markers, {lat: prevState.center.lat, lng: prevState.center.lng}],
        }));
    }

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

    onChildUpCallback(childKey, childProps, mouse) {
        this.setState({draggable: true});
        console.log('onChildUpCallback called with', childKey, childProps, mouse);
    }

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
                        onChildClick={() => console.log('child click, parent method')}
                        onClick={() => console.log('mapClick')}
                    >
                        {this.state.markers.map((val, idx) => 
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
}

export default Map;