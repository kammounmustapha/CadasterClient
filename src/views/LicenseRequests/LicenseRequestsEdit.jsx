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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Launcher } from "react-chat-window";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Table from "components/Table/Table";
class LicenseRequestsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationStatus: "",
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
      actions: [],
      actionsList: []
    };
    this.applicationService = new LicenseRequestsService();
    this.companyService = new CompanyService();
    this.authService = new AuthService();
    this.licenseService = new LicenseService();
  }
  componentWillMount() {
    if (!localStorage.getItem("currentLicenceApplication")) {
      this.props.history.replace("/admin/lincenseApplications");
    }
  }
  componentDidMount() {
    this.applicationService
      .getById(localStorage.getItem("currentLicenceApplication"))
      .then(res => {
        this.setState({ currentLicenceApplication: res.doc }, () => {
          const {
            properties,
            createdAt
          } = this.state.currentLicenceApplication;
          this.setState({
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
            username: properties.user.fullName,
            appDate: this.getDate(createdAt),
            actionsList: properties.actions
          });
          var actions = properties.actions.map((el, i = 1) => {
            return [i + 1, el.name, el.date, el.responsibleUser.fullName];
          });
          this.setState({ actions: actions });
          if (properties.messages) {
            this.setState({ messageList: properties.messages });
          }
          if (properties.approved != "0") {
            this.setState({ buttonsDisabled: true });
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
        var array = [];
        array = this.state.parties.map(suggestion => ({
          value: suggestion.fullName,
          label: suggestion.fullName,
          object: suggestion
        }));
        var MS = (
          <SelectMultiple
            id="company"
            value={array}
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
    return (
      <div>
        <Tabs>
          <div>
            <center>
              <Tab>
                <Button color="primary">Information</Button>
              </Tab>
              <Tab>
                <Button color="primary">Draw the Area</Button>
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
                      {this.state.applicationStatus}
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
                            id="peggedDate"
                            label="Pegged Date"
                            type="date"
                            defaultValue="2019-08-10"
                            className={classes.textField}
                            value={this.state.peggedDate}
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
                    <Table
                      tableHeaderColor="primary"
                      tableHead={[
                        "Number",
                        "Action",
                        "Completed Date",
                        "Responsible User"
                      ]}
                      tableData={this.state.actions}
                    ></Table>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </Panel>
        </Tabs>
        <GridContainer>
          <Card>
            <CardBody>
              <GridContainer xs={18} sm={12} md={12}>
                <Button
                  style={{ backgroundColor: "#00f601" }}
                  onClick={() => {
                    this.setState({ openAccept: true });
                  }}
                  disabled={this.state.buttonsDisabled}
                >
                  Accept
                </Button>
                <Button
                  onClick={() => {
                    this.setState({ openReject: true });
                  }}
                  style={{ backgroundColor: "#fe270b" }}
                  disabled={this.state.buttonsDisabled}
                >
                  Reject
                </Button>
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
              </GridContainer>
              <div>
                <Dialog
                  open={this.state.openAccept}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Accept</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      To Accept this permit Application, please indicate the
                      grant and expiry dates
                    </DialogContentText>
                    <TextField
                      autoFocus
                      value={this.state.grantDate}
                      margin="dense"
                      id="grantDate"
                      label="Grant Date"
                      type="date"
                      onChange={this.handleChange}
                      fullWidth
                    />
                    <TextField
                      autoFocus
                      value={this.state.expiryDate}
                      margin="dense"
                      id="expiryDate"
                      label="Expiry Date"
                      type="date"
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleSubmitAccept} color="primary">
                      Accept
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
              <div>
                <Dialog
                  open={this.state.openReject}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Reject</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      To Reject this application, please leave a message
                      explaining the rejection reason(s)
                    </DialogContentText>
                    <TextField
                      autoFocus
                      value={this.state.rejectMessage}
                      margin="dense"
                      id="rejectMessage"
                      label="Reject reasons"
                      type="textfield"
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleSubmitReject} color="primary">
                      Reject
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </CardBody>
          </Card>
        </GridContainer>
      </div>
    );
  }
  handleClose = () => {
    this.setState({ openAccept: false, openReject: false, openMessage: false });
  };
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmitAccept = e => {
    var actions = this.state.actionsList;
    actions.push({
      name: "Granting",
      date: Date(Date.now())
        .toString()
        .slice(4, 21),
      responsibleUser: this.authService.getProfile()
    });
    this.applicationService
      .updateApplication(this.state.currentLicenceApplication._id, {
        "properties.approved": "+1",
        "properties.status": "َActive",
        "properties.actions": actions
      })
      .then(res1 => {
        alert("success");
      })
      .catch(err1 => {
        alert("err");
      });
    var newLicense = this.state.currentLicenceApplication;
    delete newLicense._id;
    delete newLicense.properties.approved;
    newLicense.properties.appliedAt = newLicense.createdAt;
    newLicense.properties.actions = actions;
    delete newLicense.createdAt;
    delete newLicense.updatedAt;
    newLicense.properties.grantDate = this.state.grantDate;
    newLicense.properties.expiryDate = this.state.expiryDate;
    newLicense.properties.status = "Active";
    this.licenseService.addLicense(newLicense).then(res => {
      console.log(res.doc);
      this.props.history.push("/admin/Licenses");
    });

    this.handleClose();
  };
  handleSubmitReject = e => {
    var action = {
      name: "Rejecting",
      date: Date(Date.now())
        .toString()
        .slice(4, 21),
      responsibleUser: this.authService.getProfile()
    };
    this.setState({ actionsList: [...this.state.actionsList, action] }, () => {
      this.applicationService
        .updateApplication(this.state.currentLicenceApplication._id, {
          "properties.approved": "-1",
          "properties.status": "Rejected",
          "properties.actions": this.state.actionsList
        })
        .then(res => {
          this.props.history.push("/admin/lincenseApplications");
        })
        .catch(err => {
          alert("err");
        });
    });
  };
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
    var action = {
      name: "Message sent: " + message.data.text,
      date: Date(Date.now())
        .toString()
        .slice(4, 21),
      responsibleUser: this.authService.getProfile()
    };
    this.setState(
      {
        messageList: [...this.state.messageList, message],
        actionsList: [...this.state.actionsList, action]
      },
      () => {
        this.applicationService
          .updateApplication(this.state.currentLicenceApplication._id, {
            "properties.messages": this.state.messageList,
            "properties.actions": this.state.actionsList
          })
          .then(res => {});
      }
    );
  }
}

export default withStyles(dashboardStyle)(LicenseRequestsEdit);
