import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import SvgIcon from '@material-ui/core/SvgIcon';

import styles from './Map.module.css'

const API_KEY = process.env.GMAPS_API_KEY;

//const BasicPin = ({ text }) => <div>{text}</div>;
function BasicPin(props) {
    return (
        <SvgIcon {...props}>
            <path fill="currentColor" d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
        </SvgIcon>
    );
}


class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center: [37.78, -122.43],
            zoom: 11,
            draggable: true,
            lat: 37.78,
            lng: -122.43
        };

        // for callbacks
        this.onCircleInteraction = this.onCircleInteraction.bind(this);
        this.onCircleInteraction3 = this.onCircleInteraction3.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    /* maybe add:
        static propTypes = {};
        static defaultProps = {};
    */

    onCircleInteraction(childKey, childProps, mouse) {
        this.setState({
            draggable: false,
            lat: mouse.lat,
            lng: mouse.lng
        });

        console.log('onCircleInteraction called with', childKey, childProps, mouse);
    }

    onCircleInteraction3(childKey, childProps, mouse) {
        this.setState({draggable: true});
        // function is just a stub to test callbacks  
        console.log('onCircleInteraction called with', childKey, childProps, mouse);
    }

    _onChange = ({center, zoom}) => {
        this.setState({
            center: center,
            zoom: zoom,
        });
    }

    render() {
        return (
            <div className={styles.mapContainerStyle}>
                <GoogleMapReact 
                    bootstrapURLKeys={{ key: API_KEY }}
                    draggable={this.state.draggable}
                    onChange={this._onChange}
                    center={this.state.center}
                    zoom={this.state.zoom}
                    onChildMouseDown={this.onCircleInteraction}
                    onChildMouseUp={this.onCircleInteraction3}
                    onChildMouseMove={this.onCircleInteraction}
                    onChildClick={() => console.log('child click')}
                    onClick={() => console.log('mapClick')}
                >
                    <BasicPin 
                        color = "secondary" // red
                        lat = {this.state.lat}
                        lng = {this.state.lng}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default Map;