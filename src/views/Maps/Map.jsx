import React, { Component } from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { withStyles } from "@material-ui/styles";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle";
import Maps from "./Maps";
import LicenseRequestsService from "../../services/LicenseRequestsService";
import LicensesService from "services/LicensesService";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { licenses: [], licenseApplications: [], mapComponent: "" };
    this.licenseRequestsService = new LicenseRequestsService();
    this.licensesService = new LicensesService();
  }
  componentDidMount() {
    this.licenseRequestsService.getAll().then(res => {
      this.setState({
        licenseApplications: res.docs.filter(app => {
          return app.properties.status === "Pending";
        })
      });
      this.licensesService.getAll().then(res2 => {
        console.log(this.state.licenseApplications);
        this.setState({ licenses: res2.docs }, () => {
          this.setState({
            mapComponent: (
              <Maps
                dataApplications={this.state.licenseApplications}
                dataLicenses={this.state.licenses}
              />
            )
          });
        });
      });
    });
  }

  render() {
    return <div>{this.state.mapComponent}</div>;
  }
}

export default Map;
