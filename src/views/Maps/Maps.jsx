import React, { useState, useRef } from "react";
import EPL from "./img/EPL.png";
import ERL from "./img/ERL.png";
import MC from "./img/MC.png";
import MDRL from "./img/MDRL.png";
import ML from "./img/ML.png";
import NEPL from "./img/NEPL.png";
import RL from "./img/RL.png";
import App from "./img/App.png";
import Control from "react-leaflet-control";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import L from "leaflet";
import {
  Map as LeafletMap,
  TileLayer,
  GeoJSON,
  LayersControl
} from "react-leaflet";
import { Input, TextField, TableCell, Card } from "@material-ui/core";
import { border } from "@material-ui/system";
const { Overlay } = LayersControl;

function Maps(props) {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState("");
  const mapRef = useRef("mapRef");
  const [text, setText] = useState("");
  const [layer, setLayer] = useState("");
  function onChange(e) {
    if (layer != "") {
      layer.remove();
    }
    setText(e.target.value);
    const lowerCasedFilter = e.target.value.toLowerCase();
    if (lowerCasedFilter.length > 1) {
      const data = props.dataLicenses;
      const filteredData = data.filter(item => {
        return (
          item.properties.name.toLowerCase().match(lowerCasedFilter) ||
          item.properties.district.toLowerCase().match(lowerCasedFilter) ||
          item.properties.parties[0].fullName
            .toLowerCase()
            .match(lowerCasedFilter) ||
          item.properties.commodityGroups[0].value
            .toLowerCase()
            .match(lowerCasedFilter)
        );
      });
      console.log(filteredData);
      setResult(
        <Paper style={{ backgroundColor: "#f2f2f2", border: "1px" }}>
          {filteredData.map(row => {
            return (
              <div
                key={row._id}
                onClick={handleClick.bind(this, row)}
                clickable
                style={{
                  borderTop: "1px solid blue",
                  borderBottom: "1px solid blue",
                  paddingBottom: "10px",
                  paddingLeft: "10px",
                  paddingRight: "10px"
                }}
              >
                <a href="#">
                  <div align="left">
                    <b>{row.properties.name}</b>
                  </div>
                  <div align="left">
                    <b>{getText2(row.properties.parties)}</b>
                  </div>{" "}
                  <div align="right">{row.properties.district}</div>
                  <div align="left">
                    <b>{getText(row.properties.commodityGroups)}</b>
                  </div>
                </a>
              </div>
            );
          })}
        </Paper>
      );
    } else {
      setResult();
    }
  }
  function handleClick(license) {
    setText("");
    var map = mapRef.current.leafletElement;
    var layer = L.geoJSON(license, {
      onEachFeature: onEachFeature3,
      style: { color: "#e60000", fillOpacity: 0.8, dashArray: "3", weight: 2 }
    });
    setLayer(layer);
    var l = map.addLayer(layer);
    map.fitBounds(layer.getBounds());
    layer
      .bindPopup(
        `
    <div><center> <b>Active</b> </center><br>
    Name:  <b>${license.properties.name}</b> <br>
    Type:  <b> ${license.properties.type.label}</b> <br>
    Parties:  <b>${getText2(license.properties.parties)}</b> <br>
    Grant date:  <b>${license.properties.grantDate}</b> <br>
    Expiry date:  <b>${license.properties.expiryDate}</b> <br>
    Commodities:   <b>${getText(license.properties.commodityGroups)}</b> <br>
    Area:  <b>${license.properties.surface}</b> <br>
    </div>`
      )
      .openPopup();
    setResult();
  }
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
      ref={mapRef}
    >
      <Control position="topright">
        <TextField
          style={{ backgroundColor: "#f2f2f2", width: "300px" }}
          value={text}
          placeholder="Parties, Licenses, Commodities"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
          onChange={onChange}
        ></TextField>
        <div style={{ backgroundColor: "#f2f2f2" }}>{result}</div>
      </Control>
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
        <Overlay
          checked
          name={` <b>Applications</b> <div><td><img src=${App} height="15" width="15"></td> <td>Applications</td> </div>`}
        >
          <GeoJSON
            data={props.dataApplications}
            onEachFeature={onEachFeature1}
            style={myStyle2}
          ></GeoJSON>
        </Overlay>
        {search}
      </LayersControl>
    </LeafletMap>
  );
  function onNewSearch(e) {
    console.log(e);
  }
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
    fillColor: "#4d2800",

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
function onEachFeature3(feature, layer) {
  if (feature.properties && feature.properties.name) {
    layer
      .bindPopup(
        `
    <div><center> <b>Active</b> </center><br>
    Name:  <b>${feature.properties.name}</b> <br>
    Type:  <b> ${feature.properties.type.label}</b> <br>
    Parties:  <b>${getText2(feature.properties.parties)}</b> <br>
    Grant date:  <b>${feature.properties.grantDate}</b> <br>
    Expiry date:  <b>${feature.properties.expiryDate}</b> <br>
    Commodities:   <b>${getText(feature.properties.commodityGroups)}</b> <br>
    Area:  <b>${feature.properties.surface}</b> <br>
    </div>`
      )
      .openPopup();
  }
}
export default Maps;
