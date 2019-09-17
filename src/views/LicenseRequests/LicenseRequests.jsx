import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LicenseRequestsService from "../../services/LicenseRequestsService";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle";
import { getCountries, getLicenseTypes } from "./data";
import MaterialTable from "material-table";
import purple from "@material-ui/core/colors/purple";
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
      jurisdictionFiltered: [],
      typeFiltered: [],
      searchFiltered: [],
      message: "",
      jurisdiction: "",
      type: ""
    };
    this.licenseRequestsService = new LicenseRequestsService();
  }

  componentDidMount = () => {
    this.licenseRequestsService.getAll().then(res => {
      var list = res.docs.map((element, i = 0) => {
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
        list: res.docs
      });
    });
  };
  handleNewButton = () => {
    this.props.history.push("/admin/lincenseApplicationsNew");
  };
  handleEdit = application => {
    localStorage.setItem("currentLicenceApplication", application._id);
    this.props.history.push("/admin/LicenseApplicationsEdit");
  };
  getText = array => {
    var text = "";
    array.map(element => {
      text += element.fullName + " , ";
    });
    return text;
  };

  render() {
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
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(LicenseRequests);
