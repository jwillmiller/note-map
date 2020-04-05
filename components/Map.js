import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

import styles from './Map.module.css'

const API_KEY = process.env.GMAPS_API_KEY;
const BasicPin = ({ text }) => <div>{text}</div>;

class Map extends Component {
    
    static propTypes = {
        center: PropTypes.array,
        zoom: PropTypes.number,
        noteCoords: PropTypes.any
    };

    static defaultProps = {
        center: { // default: SF, CA
            lat: 37.78,
            lng: -122.43
        },
        zoom: 11,
        noteCoords: { 
            lat: 37.78,
            lng: -122.43
        }
    };

    render() {
        return (
            <div className={styles.mapContainerStyle}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: API_KEY }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <BasicPin 
                        lat={37.75} /* Oakland, CA */ 
                        lng={-122.37} 
                        text={"PIN1"} 
                    />
                    <BasicPin
                        {...this.props.noteCoords}
                        text={"PIN2"}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default Map;