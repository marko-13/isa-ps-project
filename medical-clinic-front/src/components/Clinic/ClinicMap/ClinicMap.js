import React, { Component } from 'react';

import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

const position = [51.505, -0.09]

class ClinicMap extends Component {
    render() {
        return (
            <LeafletMap
        center={[45.2510032, 19.8332714]}
        zoom={15}
        maxZoom={25}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={[45.2547032, 19.8344714]}>
          <Popup>
            Klinika: Svetlost, Bulevar Oslobodjenja 50
          </Popup>
        </Marker>
      </LeafletMap>
        );
    }
}

export default ClinicMap;