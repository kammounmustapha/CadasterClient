import React, { Component } from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { makeStyles } from "@material-ui/core/styles";
import LicenseRequestsService from "../../services/LicenseRequestsService";
import CompanyService from "../../services/CompanyService";

import Button from "components/CustomButtons/Button.jsx";
import { getLicenseTypes, getCompanies, matchData } from "./data";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import { Tabs, Tab, Panel } from "@bumaga/tabs";
import LeafletDraw from "./LeafletDraw";
import Autocomplete from "react-autocomplete";
import IntegrationReactSelect from "./select";
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: "10px",
    marginRight: "10px",
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    position: "absolute",
    left: true
  }
}));

class LicenseRequestsNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "",
      parties: "",
      peggedDate: "07-08-2019",
      commodityGroups: "",
      jusrisdiction: "",
      region: "",
      district: "",
      project: "",
      responsbileOffice: "",
      comments: "",
      company: "",
      value: "",
      companiesList: [],
      currentLicenseId: "",
      geometry: null,
      surface: "",
      message: "",
      notAllowedToDraw: true,
      notAllowedToAccessDraw: true
    };
    this.data = getLicenseTypes();
    this.companyService = new CompanyService();
    this.licenseRequestsService = new LicenseRequestsService();
  }
  componentDidMount() {
    this.companyService.getAll().then(res => {
      console.log(res.companies);
      this.setState({ companiesList: res.companies });
    });
  }
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  inputChangedHandler = value => {
    this.setState({ type: value });
  };
  inputChangedHandler2 = value => {
    console.log(value);
    this.setState({ company: value });
  };
  validateForm = () => {
    if (
      this.state.name.length !== "" &&
      this.state.parties.length !== "" &&
      this.state.commodityGroups.length !== "" &&
      this.state.jusrisdiction.length !== "" &&
      this.state.region.length !== "" &&
      this.state.district.length !== "" &&
      this.state.project.length !== ""
    )
      return false;
    else return true;
  };
  handleSubmit = event => {
    event.preventDefault();
    const licenseApplication = {
      name: this.state.name,
      type: this.state.type,
      parties: this.state.parties,
      peggedDate: this.state.peggedDate,
      commodityGroups: this.state.commodityGroups,
      jurisdiction: this.state.jurisdiction,
      region: this.state.region,
      district: this.state.district,
      project: this.state.project,
      responsibleOffice: this.state.responsibleOffice,
      comments: this.state.comments,
      company: this.state.company.object,
      etat: 0
    };
    this.licenseRequestsService
      .addApplication(licenseApplication)
      .then(res => {
        this.setState({
          currentLicenseId: res.LicenseApplication._id,
          message: "the information are saved! please complete the map!",
          notAllowedToAccessDraw: false
        });
      })
      .catch(err => {});
    console.log(licenseApplication);
  };
  render() {
    const { classes } = this.props;
    return (
      <Tabs>
        <div>
          <center>
            <Tab>
              <Button color={this.state.etat}>Information</Button>
            </Tab>
            <Tab>
              <Button disabled={this.state.notAllowedToAccessDraw}>
                Draw the area
              </Button>
            </Tab>
          </center>
        </div>
        <Panel>
          <div>
            <GridContainer>
              <GridItem xs={18} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>
                      Information about the Application
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <form
                        className={classes.container}
                        noValidate
                        onSubmit={this.handleSubmit}
                      >
                        <GridItem xs={12} sm={12} md={12}>
                          <IntegrationReactSelect
                            id="company"
                            value={this.state.company}
                            data={this.state.companiesList}
                            message="choose the company"
                            label="Company"
                            newVal={this.inputChangedHandler2}
                          />
                          <IntegrationReactSelect
                            id="type"
                            value={this.state.type}
                            data={this.data}
                            message="choose the type of the license"
                            label="Type"
                            newVal={this.inputChangedHandler}
                          />
                          <TextField
                            id="name"
                            label="License Name"
                            className={classes.textField}
                            value={this.state.name}
                            onChange={this.handleChange}
                            margin="normal"
                            style={{ paddingRight: "20px", width: "400px" }}
                            required
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            required
                            id="parties"
                            label="Parties"
                            className={classes.textField}
                            value={this.state.parties}
                            onChange={this.handleChange}
                            margin="normal"
                            style={{ paddingRight: "20px", width: "170px" }}
                          />
                          <TextField
                            required
                            id="peggedDate"
                            label="Pegged Date"
                            type="date"
                            defaultValue="2019-08-10"
                            className={classes.textField}
                            value={this.state.peggedDate}
                            onChange={this.handleChange}
                            margin="normal"
                            style={{ paddingRight: "20px", width: "170px" }}
                          />
                          <TextField
                            required
                            id="commodityGroups"
                            label="Commodity Groups"
                            className={classes.textField}
                            value={this.state.commodityGroups}
                            onChange={this.handleChange}
                            margin="normal"
                            style={{ paddingRight: "20px", width: "170px" }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            required
                            id="jusrisdiction"
                            label="Jurisdiction"
                            className={classes.textField}
                            value={this.state.jusrisdiction}
                            onChange={this.handleChange}
                            margin="normal"
                            style={{ paddingRight: "20px", width: "170px" }}
                          />
                          <TextField
                            id="region"
                            required
                            label="Region"
                            className={classes.textField}
                            value={this.state.region}
                            onChange={this.handleChange}
                            margin="normal"
                            style={{ paddingRight: "20px", width: "170px" }}
                          />
                          <TextField
                            id="district"
                            required
                            label="District"
                            className={classes.textField}
                            value={this.state.district}
                            onChange={this.handleChange}
                            margin="normal"
                            style={{ paddingRight: "20px", width: "170px" }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            required
                            id="project"
                            label="Project"
                            className={classes.textField}
                            value={this.state.project}
                            onChange={this.handleChange}
                            margin="normal"
                            style={{ paddingRight: "20px", width: "170px" }}
                          />
                          <TextField
                            id="responsibleOffice"
                            required
                            label="Responsible Office"
                            className={classes.textField}
                            value={this.state.responsibleOffice}
                            onChange={this.handleChange}
                            margin="normal"
                            style={{ paddingRight: "20px", width: "170px" }}
                          />
                        </GridItem>
                        <GridItem>
                          <TextField
                            id="comments"
                            label="Comments"
                            type="textarea"
                            className={classes.textField}
                            value={this.state.comments}
                            onChange={this.handleChange}
                            margin="normal"
                            style={{ paddingRight: "20px", width: "270px" }}
                            multiline={true}
                            rows={4}
                            rowsMax={8}
                          />
                        </GridItem>
                        <br></br>
                        <GridItem xs={12}>
                          <Button
                            color="primary"
                            round
                            type="submit"
                            style={{ marginLeft: "30px" }}
                          >
                            Save
                          </Button>
                          <Button
                            color="default"
                            round
                            style={{ marginLeft: "30px" }}
                          >
                            Cancel
                          </Button>
                        </GridItem>
                      </form>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </Panel>

        <Panel>
          <p>{this.state.surface}</p>
          <Button
            color="primary"
            disabled={this.state.notAllowedToDraw}
            onClick={this.submitGeometry}
          >
            Submit{" "}
          </Button>
          <LeafletDraw
            onCreate={this.onCreate}
            onDelete={this.onDelete}
          ></LeafletDraw>
        </Panel>
      </Tabs>
    );
  }
  onDelete = e => {
    this.setState({ notAllowedToDraw: true, surface: "" });
  };
  onCreate = (geo, surface) => {
    this.setState({
      geometry: geo[0],
      surface: (surface / 100).toFixed(2) + " He",
      notAllowedToDraw: false
    });
    console.log(surface);
  };
  submitGeometry = e => {
    e.preventDefault();
    const g = {
      geometry: {
        type: "Polygon",
        coordinates: [this.state.geometry]
      }
    };
    this.licenseRequestsService
      .updateApplication(this.state.currentLicenseId, g)
      .then(res => {
        console.log("succeess");
        this.props.history.replace("/admin/lincenseApplications");
      })
      .catch(err => {
        console.log("err");
      });
  };
}

export default withStyles(dashboardStyle)(LicenseRequestsNew);
