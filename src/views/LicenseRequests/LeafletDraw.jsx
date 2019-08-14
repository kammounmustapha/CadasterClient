import React, { Component } from "react";
import { Map, TileLayer, FeatureGroup, Circle } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import Button from "../../components/CustomButtons/Button";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png"
});

//

let polyline;
class LeafletDraw extends Component {
  constructor(props) {
    super(props);
  }

  _onEdited = e => {
    let numEdited = 0;
    e.layers.eachLayer(layer => {
      numEdited += 1;
    });
    console.log(`_onEdited: edited ${numEdited} layers`, e);

    this._onChange();
  };

  _onCreated = e => {
    let type = e.layerType;
    let layer = e.layer;
    const surface = L.GeometryUtil.geodesicArea(layer._latlngs[0]);

    this.props.onCreate(layer._latlngs, surface);
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
    return (
      <div>
        <Map center={[37.8189, -122.4786]} zoom={13} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <FeatureGroup
          /*   ref={reactFGref => {
            this._onFeatureGroupReady(reactFGref);
          }}  */
          >
            <EditControl
              position="topright"
              onEdited={this._onEdited}
              onCreated={this._onCreated}
              onDeleted={this._onDeleted}
              onMounted={this._onMounted}
              onEditStart={this._onEditStart}
              onEditStop={this._onEditStop}
              onDeleteStart={this._onDeleteStart}
              onDeleteStop={this._onDeleteStop}
              draw={{
                rectangle: false,
                marker: false,
                square: false,
                polyline: false,
                circlemarker: false,
                circle: false
              }}
            />
          </FeatureGroup>
        </Map>
      </div>
    );
  }
  _editableFG = null;
  _onFeatureGroupReady = reactFGref => {
    // populate the leaflet FeatureGroup with the geoJson layers
    let geodata = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [-122.47979164123535, 37.830124319877235],
              [-122.47721672058105, 37.809377088502615]
            ]
          }
        }
      ]
    };
    let leafletGeoJSON = new L.GeoJSON(geodata);
    let leafletFG = reactFGref.leafletElement;

    leafletGeoJSON.eachLayer(layer => {
      leafletFG.addLayer(layer);
    });

    // store the ref for future access to content

    this._editableFG = reactFGref;
  };

  _onChange = () => {
    // this._editableFG contains the edited geometry, which can be manipulated through the leaflet API

    const { onChange } = this.props;

    if (!this._editableFG || !onChange) {
      return;
    }

    const geojsonData = this._editableFG.leafletElement.toGeoJSON();
    onChange(geojsonData);
  };
}

export default LeafletDraw;
