import React from 'react';
import Map from '../components/Map.js'
import Sidebar from '../components/Sidebar';

function Workspace(props) {
    return (
        <div className="container">
            <header className="workspace-header">
                My Note Map
            </header>
            <div className="map-container">
                <Map />
                <Sidebar />
            </div>
        </div>
    );
}

export default Workspace;