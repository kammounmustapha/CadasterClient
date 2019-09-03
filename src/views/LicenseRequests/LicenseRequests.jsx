import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { makeStyles } from "@material-ui/core/styles";
import LicenseRequestsService from "../../services/LicenseRequestsService";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import IntegrationReactSelect from "./select";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle";
import { withStyles } from "@material-ui/styles";
import { getCountries, getLicenseTypes } from "./data";
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
  filterApplications = e => {
    if (e.target.value.toString().length === 0) {
      this.setState({ searchFiltered: this.state.applicationsList }, () => {
        this.makeIntersection();
      });
    } else {
      var updatedList = [];
      updatedList = this.state.applicationsList.filter(item => {
        return (
          item.properties.name
            .toString()
            .toLowerCase()
            .search(e.target.value.toString().toLowerCase()) !== -1
        );
      });
      this.setState(
        {
          searchFiltered: updatedList
        },
        () => {}
      );
      this.makeIntersection();
      if (updatedList == 0) {
        this.setState({
          message: true
        });
      } else {
        this.setState({
          message: false
        });
      }
    }
  };
  filterApplicationsWithJurisdiction = value => {
    this.setState({ jurisdiction: value });
    if (value.label === "All") {
      this.setState(
        { jurisdictionFiltered: this.state.applicationsList },
        () => {
          this.makeIntersection();
        }
      );
    } else {
      var updatedList = [];

      updatedList = this.state.applicationsList.filter(item => {
        return (
          item.properties.jurisdiction.toString().toLowerCase() ===
          value.label.toString().toLowerCase()
        );
      });
      this.setState(
        {
          jurisdictionFiltered: updatedList
        },
        () => {
          this.makeIntersection();
        }
      );
    }
  };
  filterApplicationsWithType = value => {
    this.setState({ type: value });
    if (value.value === "All") {
      this.setState({ typeFiltered: this.state.applicationsList }, () => {
        this.makeIntersection();
      });
    } else {
      var updatedList = [];
      updatedList = this.state.applicationsList.filter(item => {
        return item.properties.type.value === value.value;
      });

      this.setState(
        {
          typeFiltered: updatedList
        },
        () => {
          this.makeIntersection();
        }
      );
    }
  };

  makeIntersection = () => {
    var kiran = [];
    var kiran2 = [];
    var array1 = this.state.typeFiltered;
    var array2 = this.state.searchFiltered;
    var array3 = this.state.jurisdictionFiltered;
    if (array1.length === 0 || array2.length === 0 || array3.length === 0) {
      this.setState({ applicationsListFinal: [] });
    }

    kiran = array1.filter(a => array2.some(b => a._id === b._id));
    kiran2 = array3.filter(a => kiran.some(b => b._id === a._id));
    this.setState({ applicationsListFinal: kiran2 });
  };

  componentDidMount = () => {
    this.licenseRequestsService.getAll().then(res => {
      this.setState({
        applicationsList: res.docs,
        applicationsListFinal: res.docs,
        jurisdictionFiltered: res.docs,
        searchFiltered: res.docs,
        typeFiltered: res.docs
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
    const { classes } = this.props;
    var TypesList = getLicenseTypes();
    TypesList.unshift({ abbr: "All", name: "All" });
    var CountriesList = getCountries();
    CountriesList.unshift({ name: "All", code: "All" });

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
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    id="search"
                    label="Search"
                    type="search"
                    className={classes.textField}
                    margin="normal"
                    onChange={this.filterApplications}
                    style={{ width: 400 }}
                  />
                  {this.state.message ? <li>No search results.</li> : ""}
                  <IntegrationReactSelect
                    id="jurisdiction"
                    value={this.state.jurisdiction}
                    data={CountriesList}
                    //  message="choose the jurisdiction country"
                    label="Jurisdiction"
                    newVal={this.filterApplicationsWithJurisdiction}
                  />
                  <IntegrationReactSelect
                    id="type"
                    value={this.state.type}
                    data={TypesList}
                    label="Type"
                    newVal={this.filterApplicationsWithType}
                  />
                </GridItem>

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
                  tableData={this.state.applicationsListFinal.map(
                    application => {
                      const { properties } = application;
                      return [
                        <b>{properties.name}</b>,
                        //     <b>{properties.parties}</b>,
                        <b>{this.getText(properties.parties)}</b>,
                        <b>
                          {properties.type.label +
                            "(" +
                            properties.type.value +
                            ")"}
                        </b>,
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
                    }
                  )}
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
