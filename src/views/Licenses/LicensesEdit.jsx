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
import AuthService from "layouts/AuthService";
import LicenseService from "services/LicensesService";
import Table from "components/Table/Table";
import MaterialTable from "material-table";
class LicensesEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationStatus: "",
      currentLicense: {},
      name: "",
      type: "",
      parties: "",
      grantDate: "",
      expiryDate: "",
      commodityGroups: "",
      jurisdiction: "",
      region: "",
      district: "",
      project: "",
      responsbileOffice: "",
      comments: "",
      company: "",
      companiesList: [],
      MS: "",
      openAccept: false,
      openMessage: false,
      openReject: false,
      grantDate: "07-08-2019",
      expiryDate: "07-08-2019",
      rejectMessage: "",
      messageList: [],
      buttonsDisabled: false,
      actionsList: [],
      actions: []
    };
    this.companyService = new CompanyService();
    this.authService = new AuthService();
    this.licenseService = new LicenseService();
  }
  componentWillMount() {
    if (!localStorage.getItem("currentLicense")) {
      this.props.history.replace("/admin/Licenses");
    }
  }
  componentDidMount() {
    this.licenseService
      .getById(localStorage.getItem("currentLicense"))
      .then(res => {
        this.setState({ currentLicense: res.doc }, () => {
          const { properties, createdAt } = this.state.currentLicense;
          this.setState({
            type:
              properties.type.label /*+ " (" + properties.type.value + ")" */,
            name: properties.name,
            parties: properties.parties,
            grantDate: properties.grantDate,
            expiryDate: properties.expiryDate,
            commodityGroups: properties.commodityGroups,
            jurisdiction: properties.jurisdiction,
            region: properties.region,
            district: properties.district,
            project: properties.project,
            responsibleOffice: properties.responsibleOffice,
            comments: properties.comments,
            surface: properties.surface,
            username: properties.user.fullName,
            appDate: this.getDate(properties.appliedAt),
            actionsList: properties.actions
          });
          var actions = [];
          properties.actions.map((el, i = 1) => {
            actions.push({
              number: i + 1,
              "el.name": el.name,
              "el.date": el.date,
              "el.responsibleUser.fullName": el.responsibleUser.fullName
            });
          });
          this.setState({ actions });
          if (properties.messages) {
            this.setState({ messageList: properties.messages });
          }
        });
      });
  }
  getDate(datestr) {
    var date = new Date(datestr);
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var h = date.getHours();
    var ms = date.getMinutes();
    return (
      d.toString() +
      "/" +
      m.toString() +
      "/" +
      y.toString() +
      "   " +
      h.toString() +
      ":" +
      ms.toString()
    );
  }
  render() {
    const { classes } = this.props;
    const colmuns = [
      { title: "Number", field: "number" },
      { title: "Action", field: "el.name" },
      { title: "Date", field: "el.date" },
      { title: "Responsible User", field: "el.responsibleUser.fullName" }
    ];
    return (
      <div>
        <Tabs>
          <div>
            <center>
              <Tab>
                <Button color="primary">Information</Button>
              </Tab>
              <Tab>
                <Button color="primary">View Shape</Button>
              </Tab>
              <Tab>
                <Button color="primary">Actions</Button>
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

                      {this.state.createdBy}
                    </CardHeader>
                    <CardBody>
                      <form
                        className={classes.container}
                        noValidate
                        onSubmit={this.handleSubmitInfos}
                      >
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            id="CadasterApplicant"
                            label="Cadaster Applicant"
                            className={classes.textField}
                            value={this.state.username}
                            margin="normal"
                            style={{ paddingRight: "20px", width: "280px" }}
                          />
                          <TextField
                            id="ApplicationDate"
                            label="Application Date"
                            className={classes.textField}
                            value={this.state.appDate}
                            margin="normal"
                            style={{ paddingRight: "20px", width: "280px" }}
                          />
                          {this.state.MS}
                          <IntegrationReactSelect
                            isDisabled={true}
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
                            margin="normal"
                            style={{ paddingRight: "20px", width: "280px" }}
                          />
                        </GridItem>
                        <GridItem>
                          <TextField
                            required
                            id="grantDate"
                            label="Grant Date"
                            type="date"
                            defaultValue="2019-08-10"
                            className={classes.textField}
                            value={this.state.grantDate}
                            margin="normal"
                            style={{ paddingRight: "20px", width: "280px" }}
                          />
                          <TextField
                            required
                            id="expiryDate"
                            label="Expiry Date"
                            type="date"
                            defaultValue="2019-08-10"
                            className={classes.textField}
                            value={this.state.expiryDate}
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
                          <TextField
                            value={this.state.surface}
                            label="Surface"
                            style={{
                              paddingRight: "20px",
                              width: "280px",
                              marginBottom: "30px"
                            }}
                          ></TextField>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <IntegrationReactSelect
                            isDisabled={true}
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
                            margin="normal"
                            style={{ paddingRight: "20px", width: "280px" }}
                          />
                          <TextField
                            required
                            id="project"
                            label="Project"
                            className={classes.textField}
                            value={this.state.project}
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
                            margin="normal"
                            style={{ paddingRight: "20px", width: "270px" }}
                            multiline={true}
                            rows={4}
                            rowsMax={8}
                          />
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
                    <GridContainer></GridContainer>
                    <GridContainer xs={18} sm={2} md={2}>
                      <LeafletDraw
                        currentApplication={this.state.currentLicense}
                        type="edit"
                      ></LeafletDraw>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </Panel>
          <Panel>
            <GridContainer>
              <GridItem xs={18} sm={12} md={12}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Actions</h4>
                  </CardHeader>
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
                      title="List of Actions"
                      columns={colmuns}
                      data={this.state.actions}
                      onRowClick={this.handleRowClick}
                    />
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </Panel>
        </Tabs>
      </div>
    );
  }
  _onMessageWasSent(message) {
    message.data.text +=
      " \n (Sent by: " +
      this.authService.getProfile().fullName +
      ": Cadaster Manager" +
      "\n at: " +
      Date(Date.now())
        .toString()
        .slice(4, 21) +
      " )";
    message.author = "them";
    message.owner = this.authService.getProfile();
    console.log(message);
    this.setState(
      {
        messageList: [...this.state.messageList, message]
      },
      () => {
        this.applicationService
          .updateApplication(this.state.currentLicenceApplication._id, {
            "properties.messages": this.state.messageList
          })
          .then(res => {});
      }
    );
  }
}

export default withStyles(dashboardStyle)(LicensesEdit);
