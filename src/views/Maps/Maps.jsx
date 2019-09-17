import React from "react";
import EPL from "./img/EPL.png";
import ERL from "./img/ERL.png";
import MC from "./img/MC.png";
import MDRL from "./img/MDRL.png";
import ML from "./img/ML.png";
import NEPL from "./img/NEPL.png";
import RL from "./img/RL.png";
import * as L from "leaflet";
import LeafletSearch from "./MapComp";
import {
  Map as LeafletMap,
  TileLayer,
  GeoJSON,
  LayersControl,
  withLeaflet,
  MapControl
} from "react-leaflet";
import {
  GeoSearchControl,
  OpenStreetMapProvider,
  BaseProvider
} from "leaflet-geosearch";
class AddressControl extends MapControl {
  createLeafletElement() {
    const provider = new OpenStreetMapProvider();

    return GeoSearchControl({
      provider: provider,
      position: "topright",
      animateZoom: true,
      autoClose: true,
      searchLabel: "Parties, License",
      style: "bar"
    });
  }
}

const { Overlay } = LayersControl;
function Maps(props) {
  return (
    <LeafletMap
      center={[33.7931605, 9.5607653]}
      zoom={6}
      attributionControl={true}
      zoomControl={true}
      doubleClickZoom={true}
      scrollWheelZoom={true}
      dragging={true}
      animate={true}
      easeLinearity={0.35}
    >
      <LayersControl position="bottomleft" collapsed={false}>
        <TileLayer url="https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png" />
        <Overlay
          checked
          name={` 
          <b>Active Licenses</b>
          <div>
          <center>
          <table>
          <tr>
          <td><img src=${EPL} height="15" width="15"></img></td>
          <td>Exclusive Prospecting License</td>
          </tr>
         <tr>
         <td><img src=${ERL} height="15" width="15"> </td>
         <td>Exclusive Reconnaissance License</td>
         </tr>
         <tr>
         <td><img src=${NEPL} height="15" width="15"></td>
         <td>Non-Exclusive Prospecting License</td>
         </tr>
         <tr>
         <td><img src=${RL} height="15" width="15"></td>
         <td>Reconnaissance License</td>
         </tr>
         <tr>
         <td><img src=${ML} height="15" width="15"></td>
         <td>Mining License</td>
         </tr>
         <tr>
         <td><img src=${MDRL} height="15" width="15"></td>
         <td>Mining Deposit Retention License</td>
         </tr>
         <tr>
         <td><img src=${MC} height="15" width="15"></td>
         <td>Mining Claims</td> 
         </tr>
          </table>
          </center>
          </div>
          `}
        >
          <GeoJSON
            data={props.dataLicenses}
            onEachFeature={onEachFeature2}
            style={myStyle}
            onFeatureClick={onFeatureClick}
          ></GeoJSON>
        </Overlay>
        <Overlay checked name="Applications">
          <GeoJSON
            data={props.dataApplications}
            onEachFeature={onEachFeature1}
            style={myStyle2}
          ></GeoJSON>
        </Overlay>
      </LayersControl>
    </LeafletMap>
  );
}
function onFeatureClick(feature, layer) {}
function onEachFeature1(feature, layer) {
  if (feature.properties && feature.properties.name) {
    layer.bindPopup(
      `<div ><center> <b>Application</b> </center><br>
      Name:  <b>${feature.properties.name}</b> <br> 
      Type:  <b> ${feature.properties.type.label}</b> <br>
      Parties:  <b>${getText2(feature.properties.parties)}</b> <br>
      Application date:   <b>${feature.properties.actions[0].date}</b> <br>
      Commodities:   <b>${getText(feature.properties.commodityGroups)}</b> <br>
      Area:  <b>${feature.properties.surface}</b> <br>
     <div>`
    );
  }
}
function onEachFeature2(feature, layer) {
  if (feature.properties && feature.properties.name) {
    layer.bindPopup(`
    <div><center> <b>Active</b> </center><br>
    Name:  <b>${feature.properties.name}</b> <br>
    Type:  <b> ${feature.properties.type.label}</b> <br>
    Parties:  <b>${getText2(feature.properties.parties)}</b> <br>
    Grant date:  <b>${feature.properties.grantDate}</b> <br>
    Expiry date:  <b>${feature.properties.expiryDate}</b> <br>
    Commodities:   <b>${getText(feature.properties.commodityGroups)}</b> <br>
    Area:  <b>${feature.properties.surface}</b> <br>
    </div>`);
  }
}
var myStyle = feature => {
  switch (feature.properties.type.value) {
    case "EPL":
      return {
        color: "#99d9ea",
        fillOpacity: 0.8,
        dashArray: "3",
        weight: 2
      };
    case "ERL":
      return {
        color: "#f43788",
        fillOpacity: 0.8,
        dashArray: "3",
        weight: 2
      };
    case "MC":
      return {
        color: "#9d9d9d",
        fillOpacity: 0.8,
        dashArray: "3",
        weight: 2
      };
    case "MDRL":
      return {
        color: "#c9e817",
        fillOpacity: 0.8,
        dashArray: "3",
        weight: 2
      };
    case "ML":
      return {
        color: "#9e9f60",
        fillOpacity: 0.8,
        dashArray: "3",
        weight: 2
      };
    case "NEPL":
      return {
        color: "#fb7b51",
        fillOpacity: 0.8,
        dashArray: "3",
        weight: 2
      };
    case "RL":
      return {
        color: "#9c8fbc",
        fillOpacity: 0.8,
        dashArray: "3",
        weight: 2
      };
  }
};
function myStyle2(feature) {
  return {
    fillColor: "#a44a2c",
    weight: 0.8,
    opacity: 0.9,
    dashArray: "3",
    fillOpacity: 0.4
  };
}

function getText(list) {
  var text = "";
  list.map(element => {
    text += element.value + ", ";
  });
  var text2 = text.substring(0, text.length - 2);
  return text2;
}
function getText2(list) {
  var text = "";
  list.map(element => {
    text += element.fullName + ", ";
  });
  var text2 = text.substring(0, text.length - 2);
  return text2;
}
export default Maps;
