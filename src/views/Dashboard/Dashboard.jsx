import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import PublicMap from "../Maps/PublicMap";
import Map2 from "../Maps/Map2";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import AuthService from "../../layouts/AuthService";
import LicenseRequestsService from "../../services/LicenseRequestsService";
import Maps from "../Maps/Maps";
import LicensesService from "services/LicensesService";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      licenses: [],
      licenseApplications: [],
      mapComponent: ""
    };
    this.authService = new AuthService();
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
    const { classes } = this.props;
    return <div>{this.state.mapComponent}</div>;
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
