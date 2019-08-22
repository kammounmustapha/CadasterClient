import React, { Component } from "react";
import { Tabs, Tab, Panel } from "@bumaga/tabs";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { withStyles, TextField } from "@material-ui/core";
import CardHeader from "components/Card/CardHeader.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle";
import LicenseRequestsService from "services/LicenseRequestsService";
import LeafletDraw from "./LeafletDraw";
import IntegrationReactSelect from "./select";
import SelectMultiple from "./selectMultiple";
import { getCountries, getLicenseTypes, getCommodities } from "./data";
import CompanyService from "services/CompanyService";
class LicenseRequestsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLicenceApplication: {},
      name: "",
      type: "",
      parties: "",
      peggedDate: "07-08-2019",
      commodityGroups: "",
      jurisdiction: "",
      region: "",
      district: "",
      project: "",
      responsbileOffice: "",
      comments: "",
      company: "",
      notAllowedToDraw: true,
      nbDraw: 0,
      companiesList: [],
      MS: ""
    };
    this.applicationService = new LicenseRequestsService();
    this.companyService = new CompanyService();
  }
  componentDidMount() {
    this.applicationService
      .getById(localStorage.getItem("currentLicenceApplication"))
      .then(res => {
        this.setState({ currentLicenceApplication: res.doc }, () => {
          const { properties } = this.state.currentLicenceApplication;
          this.setState({
            company: properties.company.fullName,
            type:
              properties.type.label /*+ " (" + properties.type.value + ")" */,
            name: properties.name,
            parties: properties.parties,
            peggedDate: properties.peggedDate,
            commodityGroups: properties.commodityGroups,
            jurisdiction: properties.jurisdiction,
            region: properties.region,
            district: properties.district,
            project: properties.project,
            responsibleOffice: properties.responsibleOffice,
            comments: properties.comments,
            surface: properties.surface
          });
        });
      });
    this.companyService.getAll().then(res => {
      this.setState({ companiesList: res.companies }, () => {
        var MS = (
          <SelectMultiple
            id="company"
            value={this.getText()}
            data={this.state.companiesList}
            message="choose the company"
            label="Company"
            newVal={this.inputChangedHandler2}
          />
        );
        this.setState({ MS: MS });
      });
    });
  }
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmitInfos = event => {
    event.preventDefault();
    const newProperties = {
      properties: {
        name: this.state.name,
        parties: this.state.parties,
        peggedDate: this.state.peggedDate,
        commodityGroups: this.state.commodityGroups,
        jurisdiction: this.state.jurisdiction,
        region: this.state.region,
        district: this.state.district,
        project: this.state.project,
        responsibleOffice: this.state.responsibleOffice,
        comments: this.state.comments,
        type: this.state.currentLicenceApplication.properties.type,
        company: this.state.currentLicenceApplication.properties.company,
        user: this.state.currentLicenceApplication.properties.user
      }
    };
    this.applicationService
      .updateApplication(
        this.state.currentLicenceApplication._id,
        newProperties
      )
      .then(res => {
        console.log("succeded!");
        window.location.reload();
      })
      .catch(err => {
        console.log("err " + err);
      });
  };
  inputChangedHandler3 = value => {
    this.setState({ jurisdiction: value.label });
  };
  inputChangedHandler4 = value => {
    this.setState({ type: value });
  };
  inputChangedHandler1 = value => {
    this.setState({ commodityGroups: value });
  };
  inputChangedHandler2 = value => {
    console.log(value);
    var array = [];
    value.map(element => {
      array.push(element.object);
    });

    this.setState({ company: array, parties: array });
  };
  renderPartiesMS() {
    return (
      <SelectMultiple
        id="company"
        value={this.getText()}
        data={this.state.companiesList}
        message="choose the company"
        label="Company"
        newVal={this.inputChangedHandler2}
      />
    );
  }
  getText() {
    var array = [];
    array = this.state.parties.map(suggestion => ({
      value: suggestion.fullName,
      label: suggestion.fullName,
      object: suggestion
    }));

    return array;
  }
  render() {
    const { classes } = this.props;
    console.log(this.state.center);
    return (
      <Tabs>
        <div>
          <center>
            <Tab>
              <Button color="primary">Information</Button>
            </Tab>
            <Tab>
              <Button color="primary">Draw the area</Button>
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
                      Information about Application
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <form
                      className={classes.container}
                      noValidate
                      onSubmit={this.handleSubmitInfos}
                    >
                      <GridItem xs={12} sm={12} md={12}>
                        {this.state.MS}
                        <IntegrationReactSelect
                          id="type"
                          value={this.state.type}
                          data={getLicenseTypes()}
                          message="Choose the type"
                          label="Type"
                          newVal={this.inputChangedHandler4}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          id="name"
                          label="License Name"
                          className={classes.textField}
                          value={this.state.name}
                          onChange={this.handleChange}
                          margin="normal"
                          style={{ paddingRight: "20px", width: "280px" }}
                          required
                        />
                      </GridItem>
                      <GridItem>
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
                          style={{ paddingRight: "20px", width: "280px" }}
                        />
                        <SelectMultiple
                          id="commodityGroups"
                          value={this.state.commodityGroups}
                          data={getCommodities()}
                          message="Choose the commodity groups"
                          label="Commodity Groups"
                          value={this.state.commodityGroups}
                          newVal={this.inputChangedHandler1}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <IntegrationReactSelect
                          id="jurisdiction"
                          value={this.state.jurisdiction}
                          data={getCountries()}
                          message="choose the jurisdiction country"
                          label="Jurisdiction"
                          newVal={this.inputChangedHandler3}
                        />

                        <TextField
                          id="region"
                          required
                          label="Region"
                          className={classes.textField}
                          value={this.state.region}
                          onChange={this.handleChange}
                          margin="normal"
                          style={{ paddingRight: "20px", width: "280px" }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          id="district"
                          required
                          label="District"
                          className={classes.textField}
                          value={this.state.district}
                          onChange={this.handleChange}
                          margin="normal"
                          style={{ paddingRight: "20px", width: "280px" }}
                        />
                        <TextField
                          required
                          id="project"
                          label="Project"
                          className={classes.textField}
                          value={this.state.project}
                          onChange={this.handleChange}
                          margin="normal"
                          style={{ paddingRight: "20px", width: "280px" }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          id="responsibleOffice"
                          required
                          label="Responsible Office"
                          className={classes.textField}
                          value={this.state.responsibleOffice}
                          onChange={this.handleChange}
                          margin="normal"
                          style={{ paddingRight: "20px", width: "280px" }}
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
                      <GridItem>
                        <Button
                          type="submit"
                          color="primary"
                          style={{ marginTop: "20px", width: "100px" }}
                        >
                          Save
                        </Button>
                      </GridItem>
                    </form>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </Panel>
        <Panel>
          <GridContainer>
            <GridItem xs={18} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Draw the MAP</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <Button
                      color="primary"
                      disabled={this.state.notAllowedToDraw}
                      onClick={this.submitGeometry}
                      style={{ marginRight: "20px", width: "100px" }}
                    >
                      Submit{" "}
                    </Button>
                    <TextField
                      value={this.state.surface}
                      label="Surface"
                      disabled="true"
                      style={{ width: "100px" }}
                    ></TextField>
                  </GridContainer>
                  <GridContainer xs={18} sm={2} md={2}>
                    <LeafletDraw
                      onCreate={this.onCreate}
                      onDelete={this.onDelete}
                      onEdit={this.onEdit}
                      currentApplication={this.state.currentLicenceApplication}
                      type="edit"
                    ></LeafletDraw>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </Panel>
      </Tabs>
    );
  }
  onDelete = e => {
    if (this.state.nbDraw > 1) {
      this.setState({ nbDraw: this.state.nbDraw - 1 });
    } else {
      this.setState({
        bDraw: this.state.nbDraw - 1,
        notAllowedToDraw: true,
        surface: ""
      });
    }
  };
  onCreate = (geo, surface) => {
    this.setState({
      geometry: geo,
      nbDraw: this.state.nbDraw + 1,
      surface: (surface / 100).toFixed(2) + " Ha",
      notAllowedToDraw: false
    });
    if (this.state.nbDraw > 1) {
      this.setState({
        notAllowedToDraw: true
      });
    }
  };
  onEdit = (geo, surface) => {
    this.setState({
      geometry: geo,
      surface: (surface / 100).toFixed(2) + " Ha",
      notAllowedToDraw: false
    });
  };
  submitGeometry = e => {
    e.preventDefault();
    const g = {
      "properties.surface": this.state.surface,
      geometry: {
        type: "Polygon",
        coordinates: this.state.geometry
      }
    };
    this.applicationService
      .updateApplication(this.state.currentLicenceApplication._id, g)
      .then(res => {
        console.log("succeess");
        this.props.history.replace("/admin/lincenseApplications");
      })
      .catch(err => {
        console.log("err");
      });
  };
}

export default withStyles(dashboardStyle)(LicenseRequestsEdit);
