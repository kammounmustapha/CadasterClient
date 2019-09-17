import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LicensesServices from "services/LicensesService";
import AuthService from "layouts/AuthService";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import IntegrationReactSelect from "./select";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle";
import { getCountries, getLicenseTypes } from "./data";
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

class Licenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: false,
      messageText: "",
      licensesList: []
    };
    this.licensesService = new LicensesServices();
    this.authService = new AuthService();
  }

  componentDidMount = () => {
    this.licensesService.getAll().then(res => {
      var licensesList = [];
      if (this.authService.getProfile().role === "1") {
        licensesList = res.docs.filter(element => {
          return (
            element.properties.user.email ===
            this.authService.getProfile().email
          );
        });
      } else {
        licensesList = res.docs;
      }
      licensesList.map((element, i = 0) => {
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
        licensesList: licensesList,
        licensesListFinal: licensesList,
        jurisdictionFiltered: licensesList,
        searchFiltered: licensesList,
        typeFiltered: licensesList
      });
    });
  };

  handleEdit = license => {
    localStorage.setItem("currentLicense", license._id);
    this.props.history.push("/admin/LicenseEdit");
  };
  getText = array => {
    var text = "";
    array.map(element => {
      if (element.fullName) {
        text += element.fullName + " , ";
      } else {
        text += element.value + " , ";
      }
    });
    return text;
  };

  render() {
    const { classes } = this.props;
    var TypesList = getLicenseTypes();
    TypesList.unshift({ abbr: "All", name: "All" });
    var CountriesList = getCountries();
    CountriesList.unshift({ name: "All", code: "All" });
    const columns = [
      { title: "Name", field: "properties.name" },
      { title: "Type", field: "properties.type.value" },
      { title: "Place", field: "properties.jurisdiction" },
      { title: "Grant Date", field: "properties.grantDate" },
      { title: "Expiry Date", field: "properties.expiryDate" },
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
                      if (x.counter % 2) {
                        return { backgroundColor: "#f2f2f2" };
                      }
                    },
                    headerStyle: {
                      backgroundColor: "purple",
                      color: "white"
                    }
                  }}
                  title="List of licenses"
                  columns={columns}
                  data={this.state.licensesList}
                  onRowClick={this.handleRowClick}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
  handleRowClick = x => {
    //  console.log(x);
  };
}

export default withStyles(dashboardStyle)(Licenses);
