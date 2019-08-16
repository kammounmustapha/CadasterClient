import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.jsx";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import AuthService from "../../layouts/AuthService";
import LicenseRequestsService from "../../services/LicenseRequestsService";
import Maps from "../Maps/Maps";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.authService = new AuthService();
    this.licenseRequestsService = new LicenseRequestsService();
  }

  componentDidMount() {
    this.licenseRequestsService.getAll().then(res => {
      this.setState({ licenseApplications: res.docs }, () => {
        console.log(this.state.licenseApplications);
        this.setState({
          mapComponent: <Maps data={this.state.licenseApplications} />
        });
      });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>{this.state.mapComponent}</GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
