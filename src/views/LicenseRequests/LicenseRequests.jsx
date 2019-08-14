import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { makeStyles } from "@material-ui/core/styles";
import LicenseRequestsService from "../../services/LicenseRequestsService";
import Button from "components/CustomButtons/Button.jsx";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";

import { Redirect } from "react-router-dom";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle";
import { withStyles } from "@material-ui/styles";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class LicenseRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: false,
      messageText: "",
      applicationsList: [],
      applicationsListFinal: [],
      message: ""
    };
    this.licenseRequestsService = new LicenseRequestsService();
  }
  filterApplications = e => {
    var updatedList = this.state.applicationsList;
    updatedList = updatedList.filter(item => {
      return (
        item.properties.name
          .toString()
          .toLowerCase()
          .search(e.target.value.toString().toLowerCase()) !== -1
      );
    });
    this.setState({
      applicationsListFinal: updatedList
    });
    if (updatedList == 0) {
      this.setState({
        message: true
      });
    } else {
      this.setState({
        message: false
      });
    }
  };
  componentDidMount = () => {
    this.licenseRequestsService.getAll().then(res => {
      this.setState({
        applicationsList: res.docs,
        applicationsListFinal: res.docs
      });
    });
  };
  handleNewButton = () => {
    this.props.history.push("/admin/lincenseApplicationsNew");
  };
  handleEdit = () => {};
  render() {
    const { classes } = this.props;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <GridItem xs={12} sm={12} md={6}>
                  <h4 style={styles.cardTitleWhite}>
                    License Applications List
                  </h4>
                </GridItem>
                <p style={styles.cardCategoryWhite}>
                  The list of Permit Applications
                </p>
              </CardHeader>
              <CardBody>
                <TextField
                  id="search"
                  label="Search"
                  type="search"
                  className={classes.textField}
                  margin="normal"
                  onChange={this.filterApplications}
                />
                {this.state.message ? <li>No search results.</li> : ""}
                <Table
                  tableHeaderColor="primary"
                  tableHead={[
                    "Name",
                    "Parties",
                    "Type",
                    "Pegged date",
                    "Region",
                    "Project",
                    "Company",
                    "responsible Office"
                  ]}
                  tableData={this.state.applicationsListFinal.map(
                    application => {
                      const { properties } = application;
                      return [
                        <b>{properties.name}</b>,
                        <b>{properties.parties}</b>,
                        <b>
                          {properties.type.label +
                            "(" +
                            properties.type.value +
                            ")"}
                        </b>,
                        <b>{properties.peggedDate}</b>,
                        <b>{properties.region}</b>,
                        <b>{properties.project}</b>,
                        <b>{properties.company.fullName}</b>,
                        <b>{properties.responsibleOffice}</b>,
                        <Fab
                          color="secondary"
                          aria-label="edit"
                          onClick={this.handleEdit.bind(this, application)}
                        >
                          <Icon>edit_icon</Icon>
                        </Fab>
                      ];
                    }
                  )}
                />
              </CardBody>
            </Card>
            <Button
              onClick={this.handleNewButton}
              color="primary"
              style={{
                marginRight: "900px",
                position: "left"
              }}
            >
              Add new license
            </Button>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(LicenseRequests);
