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
import { getLicenseTypes, getCountries, getCommodities } from "./data";
import TextField from "@material-ui/core/TextField";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import { Tabs, Tab, Panel } from "@bumaga/tabs";
import LeafletDraw from "./LeafletDraw";
import IntegrationReactSelect from "./select";
import SelectMultiple from "./selectMultiple";
class PermitApplicationNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "",
      parties: "",
      peggedDate: "07-08-2019",
      commodityGroups: [],
      jurisdiction: "",
      region: "",
      district: "",
      project: "",
      responsbileOffice: "",
      comments: "",
      company: [],
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
    this.setState({ company: value });
  };
  inputChangedHandler3 = value => {
    this.setState({ jurisdiction: value.label });
    console.log(value.label);
  };
  inputChangedHandler4 = value => {
    this.setState({ commodityGroups: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    var list = [];
    this.state.company.map(element => {
      list.push(element.object);
    });

    const licenseApplication = {
      name: this.state.name,
      type: this.state.type,
      parties: list,
      peggedDate: this.state.peggedDate,
      commodityGroups: this.state.commodityGroups,
      jurisdiction: this.state.jurisdiction,
      region: this.state.region,
      district: this.state.district,
      project: this.state.project,
      responsibleOffice: this.state.responsibleOffice,
      comments: this.state.comments,
      company: list,
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
                          <SelectMultiple
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

                          <SelectMultiple
                            id="commodityGroups"
                            value={this.state.commodityGroups}
                            data={getCommodities()}
                            message="Choose the commodity groups"
                            label="Commodity Groups"
                            value={this.state.commodityGroups}
                            newVal={this.inputChangedHandler4}
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
                          <br></br>
                          <p style={{ color: "red" }}>{this.state.message}</p>
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
          <TextField
            value={this.state.surface}
            label="Surface"
            disabled="true"
            style={{ width: "100px" }}
          ></TextField>
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
            type="new"
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
      "properties.surface": this.state.surface,
      geometry: {
        type: "Polygon",
        coordinates: [this.state.geometry]
      }
    };
    this.licenseRequestsService
      .updateApplication(this.state.currentLicenseId, g)
      .then(res => {
        console.log("succeess");
        this.props.history.replace("/admin/permitApplications");
      })
      .catch(err => {
        console.log("err");
      });
  };
}

export default withStyles(dashboardStyle)(PermitApplicationNew);
