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
import { Launcher } from "react-chat-window";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Table from "components/Table/Table";
import AuthService from "layouts/AuthService";
import MaterialTable from "material-table";
class PermitApplicationsEdit extends Component {
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
      MS: "",
      messageList: [],
      applicationStatus: "",
      notAllowToChange: false,
      actions: [],
      actionsList: []
    };
    this.applicationService = new LicenseRequestsService();
    this.companyService = new CompanyService();
    this.authService = new AuthService();
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
            surface: properties.surface,
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
          if (properties.approved !== "0") {
            this.setState({ notAllowToChange: true });

            if (properties.approved === "-1") {
              this.setState({
                applicationStatus: (
                  <SnackbarContent
                    message={"This Application was rejected!"}
                    close
                    color="warning"
                  />
                )
              });
            } else {
              this.setState({
                applicationStatus: (
                  <SnackbarContent
                    message={"This Application was accepeted!"}
                    close
                    color="info"
                  />
                )
              });
            }
          }
        });
      });
    this.companyService.getAll().then(res => {
      this.setState({ companiesList: res.companies }, () => {
        var MS = (
          <SelectMultiple
            isDisabled={this.state.notAllowToChange}
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
    if (!this.state.notAllowToChange) {
      this.setState({ [e.target.id]: e.target.value });
    }
  };
  handleSubmitInfos = event => {
    var action = {
      name: "Information were Edited ",
      date: Date(Date.now())
        .toString()
        .slice(4, 21),
      responsibleUser: this.authService.getProfile()
    };
    this.setState({ actionsList: [...this.state.actionsList, action] }, () => {
      this.applicationService
        .updateApplication(this.state.currentLicenceApplication._id, {
          "properties.name": this.state.name,
          "properties.parties": this.state.parties,
          "properties.peggedDate": this.state.peggedDate,
          "properties.commodityGroups": this.state.commodityGroups,
          "properties.jurisdiction": this.state.jurisdiction,
          "properties.region": this.state.region,
          "properties.district": this.state.district,
          "properties.project": this.state.project,
          "properties.responsibleOffice": this.state.responsibleOffice,
          "properties.comments": this.state.comments,
          "properties.type": this.state.type,
          "properties.company": this.state.company,
          "properties.actions": this.state.actionsList
        })
        .then(res => {
          console.log("succeded!");
          window.location.reload();
        })
        .catch(err => {
          console.log("err " + err);
        });
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
                <Button color="primary">Draw the area</Button>
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
                    </CardHeader>
                    <CardBody>
                      {this.state.applicationStatus}
                      <form
                        className={classes.container}
                        noValidate
                        onSubmit={this.handleSubmitInfos}
                      >
                        <GridItem xs={12} sm={12} md={12}>
                          {this.state.MS}
                          <IntegrationReactSelect
                            isDisabled={this.state.notAllowToChange}
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
                            isDisabled={this.state.notAllowToChange}
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
                            isDisabled={this.state.notAllowToChange}
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
                            disabled={this.state.notAllowToChange}
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
                        disabled={
                          this.state.notAllowedToDraw &&
                          this.state.notAllowToChange
                        }
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
                        currentApplication={
                          this.state.currentLicenceApplication
                        }
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
        <div>
          <Launcher
            agentProfile={{
              teamName: "chat",
              imageUrl:
                "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png"
            }}
            newMessagesCount={0}
            onMessageWasSent={this._onMessageWasSent.bind(this)}
            messageList={this.state.messageList}
          />
        </div>
      </div>
    );
  }
  _onMessageWasSent(message) {
    message.data.text +=
      " \n (Sent by: " +
      this.state.currentLicenceApplication.properties.user.fullName +
      ": Cadaster Applicant" +
      "\n at: " +
      Date(Date.now())
        .toString()
        .slice(4, 21) +
      " )";
    message.author = "me";
    var action = {
      name: "Message sent: " + message.data.text,
      date: Date(Date.now())
        .toString()
        .slice(4, 21),
      responsibleUser: this.authService.getProfile()
    };
    console.log(this.state.actionsList);
    this.setState(
      {
        messageList: [...this.state.messageList, message],
        actionsList: [...this.state.actionsList, action]
      },
      () => {
        console.log(this.state.actionsList);
        this.applicationService
          .updateApplication(this.state.currentLicenceApplication._id, {
            "properties.messages": this.state.messageList,
            "properties.actions": this.state.actionsList
          })
          .then(res => {});
      }
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
    var action = {
      name: "Shape was Edited ",
      date: Date(Date.now())
        .toString()
        .slice(4, 21),
      responsibleUser: this.authService.getProfile()
    };
    this.setState({ actionsList: [...this.state.actionsList, action] }, () => {
      const g = {
        "properties.surface": this.state.surface,
        "properties.actions": this.state.actionsList,
        geometry: {
          type: "Polygon",
          coordinates: this.state.geometry
        }
      };
      this.applicationService
        .updateApplication(this.state.currentLicenceApplication._id, g)
        .then(res => {
          console.log("succeess");
          this.props.history.replace("/admin/PermitApplicationsEdit");
          window.location.reload();
        })
        .catch(err => {
          console.log("err");
        });
    });
  };
}

export default withStyles(dashboardStyle)(PermitApplicationsEdit);
