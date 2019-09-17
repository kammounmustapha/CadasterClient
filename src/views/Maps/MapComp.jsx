import { Component } from "react";
import L from "leaflet";
import * as ELG from "esri-leaflet-geocoder";
import { withLeaflet } from "react-leaflet";

class LeafletSearch extends Component {
  componentDidMount() {
    var geojsonFeature = {
      type: "Feature",
      properties: {
        name: "Coors Field",
        amenity: "Baseball Stadium",
        popupContent: "This is where the Rockies play!"
      },
      geometry: {
        type: "Point",
        coordinates: [-104.99404, 39.75621]
      }
    };

    const { map } = this.props.leaflet;
    const searchControl = new ELG.Geosearch({
      position: "topright",
      layer: L.geoJSON(geojsonFeature),
      propertyName: "name"
    }).addTo(map);
    const results = new L.LayerGroup().addTo(map);

    searchControl.on("results", function(data) {
      results.clearLayers();
      for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
      }
    });
  }

  render() {
    return null;
  }
}

export default withLeaflet(LeafletSearch);
