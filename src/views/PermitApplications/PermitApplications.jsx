import React, { Component } from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { withStyles } from "@material-ui/styles";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle";
import Button from "components/CustomButtons/Button.jsx";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import LicenseRequestsService from "../../services/LicenseRequestsService";
import AuthService from "../../layouts/AuthService";
import MaterialTable from "material-table";
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

class PermitApplications extends Component {
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
    this.authService = new AuthService();
  }

  componentDidMount = () => {
    this.licenseRequestsService.getAll().then(res => {
      var array = [];
      res.docs.map(element => {
        if (
          element.properties.user.email === this.authService.getProfile().email
        ) {
          array.push(element);
        }
      });
      var list = array.map((element, i = 0) => {
        element.action = (
          <Fab
            color="secondary"
            aria-label="edit"
            onClick={this.handleEdit.bind(this, element)}
          >
            <Icon>edit_icon</Icon>
          </Fab>
        );
        element.counter = i;
        i++;
      });
      this.setState({
        applicationsList: list,
        list: array
      });
      console.log(res);
    });
  };
  handleNewButton = () => {
    this.props.history.push("/admin/PermitApplicationsNew");
  };
  handleEdit = application => {
    localStorage.setItem("currentLicenceApplication", application._id);
    this.props.history.push("/admin/PermitApplicationsEdit");
  };
  getText = array => {
    var text = "";
    array.map(element => {
      text += element.fullName + " , ";
    });
    return text;
  };
  render() {
    const { classes } = this.props;
    var x = (
      <Table
        tableHeaderColor="primary"
        tableHead={[
          "Name",
          "Parties",
          "Type",
          "Pegged date",
          "Region",
          "Project",
          "Status",
          "responsible Office"
        ]}
        tableData={this.state.applicationsListFinal.map(application => {
          const { properties } = application;
          return [
            <b>{properties.name}</b>,
            //     <b>{properties.parties}</b>,
            <b>{this.getText(properties.parties)}</b>,
            <b>{properties.type.label + "(" + properties.type.value + ")"}</b>,
            <b>{properties.peggedDate}</b>,
            <b>{properties.region}</b>,
            <b>{properties.project}</b>,
            <b>{properties.status}</b>,
            <b>{properties.responsibleOffice}</b>,
            <Fab
              color="secondary"
              aria-label="edit"
              onClick={this.handleEdit.bind(this, application)}
            >
              <Icon>edit_icon</Icon>
            </Fab>
          ];
        })}
      />
    );
    const columns = [
      { title: "Name", field: "properties.name" },
      { title: "Type", field: "properties.type.value" },
      { title: "Place", field: "properties.jurisdiction" },
      { title: "Pegged Date", field: "properties.peggedDate" },
      { title: "Status", field: "properties.status" },
      { title: "Area", field: "properties.surface" },
      { title: "Action", field: "action" }
    ];
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
                <MaterialTable
                  options={{
                    rowStyle: x => {
                      if (x.properties.approved === "-1") {
                        return { backgroundColor: "#ff9999" };
                      } else if (x.properties.approved === "+1") {
                        return { backgroundColor: "#b3ffd6" };
                      } else {
                        return { backgroundColor: "white" };
                      }
                    },
                    headerStyle: {
                      backgroundColor: "purple",
                      color: "white"
                    }
                  }}
                  title="List of licenses"
                  columns={columns}
                  data={this.state.list}
                  onRowClick={this.handleRowClick}
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

export default withStyles(dashboardStyle)(PermitApplications);
