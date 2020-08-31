import { useState, useRef } from 'react';

import Map from '../components/Map.js'
import Sidebar from '../components/Sidebar';

export default () => {
  return (
      <div className="container">
        <header className="top-header">
          My Note Map
        </header>
        <div className="map-container">
          <Map />
          <Sidebar />
        </div>
      </div>
    );
};