import React, { Component } from "react";
import { Map, TileLayer, FeatureGroup, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
function onEachFeature(feature, layer) {
  if (feature.properties && feature.properties.name) {
    layer.bindPopup("<i>Surface:  </i>" + feature.properties.surface);
  }
}

let polyline;
class LeafletDraw extends Component {
  constructor(props) {
    super(props);
  }

  _onEdited = e => {
    /*let numEdited = 0;
    e.layers.eachLayer(layer => {
      numEdited += 1;
    });
    console.log(`_onEdited: edited ${numEdited} layers`, e);
    */

    this._onChange();
  };

  _onCreated = e => {
    let type = e.layerType;
    let layer = e.layer;
    var array = [];
    layer._latlngs[0].map(element => {
      array.push([element.lng, element.lat]);
    });
    array.push([layer._latlngs[0][0].lng, layer._latlngs[0][0].lat]);
    var final = array;
    console.log(JSON.stringify([final]));
    const surface = L.GeometryUtil.geodesicArea(layer._latlngs[0]);

    this.props.onCreate([final], surface);
    this._onChange();
  };

  _onDeleted = e => {
    /*  let numDeleted = 0;
    e.layers.eachLayer(layer => {
      numDeleted += 1;
    });
    console.log(`onDeleted: removed ${numDeleted} layers`, e);
*/
    this.props.onDelete();
    this._onChange();
  };

  _onMounted = drawControl => {
    //console.log("_onMounted", drawControl);
    console.log(this.props.currentApplication);
  };

  _onEditStart = e => {
    //console.log("_onEditStart", e);
  };

  _onEditStop = e => {
    // console.log("_onEditStop", e);
  };

  _onDeleteStart = e => {
    // console.log("_onDeleteStart", e);
  };

  _onDeleteStop = e => {
    // console.log("_onDeleteStop", e);
  };
  render() {
    console.log();
    return (
      <div>
        <Map
          center={this.getCenter()}
          style={{ height: "600px", width: "900px" }}
          // center={[2.2, 1.3]}
          zoom={this.getZoom()}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png"
          />
          <FeatureGroup>
            <GeoJSON
              data={this.props.currentApplication}
              style={{ opacity: 1 }}
              onEachFeature={onEachFeature}
            />
          </FeatureGroup>
        </Map>
      </div>
    );
  }
  _onChange = () => {
    // this._editableFG contains the edited geometry, which can be manipulated through the leaflet API

    const { onChange } = this.props;

    if (!this._editableFG || !onChange) {
      return;
    }

    const geojsonData = this._editableFG.leafletElement.toGeoJSON();
    onChange(geojsonData);
  };
  getZoom() {
    if (this.props.type === "edit") {
      return 14;
    } else return 8;
  }
  getCenter() {
    if (this.props.type === "edit") {
      return [
        this.props.currentApplication.geometry.coordinates[0][0][1],
        this.props.currentApplication.geometry.coordinates[0][0][0]
      ];
    } else {
      return [2.2, 1.3];
    }
  }
}

export default LeafletDraw;
