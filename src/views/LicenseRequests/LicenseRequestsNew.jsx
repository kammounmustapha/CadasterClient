import React, { Component } from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { makeStyles } from "@material-ui/core/styles";
import LicenseRequestsService from "../../services/LicenseRequestsService";
import Button from "components/CustomButtons/Button.jsx";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import { Tabs, Tab, Panel } from "@bumaga/tabs";
import LeafletDraw from "./LeafletDraw";
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
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <Tabs>
        <div>
          <center>
            <Tab>
              <Button>Information</Button>
            </Tab>
            <Tab>
              <Button>Draw the area</Button>
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
                      Apply for a new license
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <form
                        className={classes.container}
                        noValidate
                        onSubmit={this.handleSubmit}
                      >
                        <GridItem xs={6} sm={12} md={12}>
                          <TextField
                            id="fullName"
                            label="Name"
                            className={classes.textField}
                            value={this.state.fullName}
                            onChange={this.handleChange}
                            margin="normal"
                            style={{ paddingRight: "20px", width: "170px" }}
                          />
                          <TextField
                            id="type"
                            label="Type"
                            className={classes.textField}
                            value={this.state.type}
                            onChange={this.handleChange}
                            margin="normal"
                            style={{ paddingRight: "20px", width: "170px" }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            id="registrationNumber"
                            label="Registration Number"
                            className={classes.textField}
                            value={this.state.registrationNumber}
                            onChange={this.handleChange}
                            margin="normal"
                            style={{ paddingRight: "20px", width: "170px" }}
                          />
                          <TextField
                            id="industry"
                            label="Industry"
                            className={useStyles.textField}
                            value={this.state.industry}
                            onChange={this.handleChange}
                            margin="normal"
                            style={{ paddingRight: "20px", width: "170px" }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            id="headquarters"
                            label="Headquarters"
                            className={useStyles.textField}
                            value={this.state.headquarters}
                            onChange={this.handleChange}
                            margin="normal"
                          />
                          <TextField
                            id="areaServed"
                            label="Served Area"
                            className={useStyles.textField}
                            value={this.state.areaserved}
                            onChange={this.handleChange}
                            margin="normal"
                            style={{ paddingRight: "20px", width: "170px" }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <TextField
                            id="website"
                            label="Web Site"
                            className={useStyles.textField}
                            value={this.state.website}
                            onChange={this.handleChange}
                            margin="normal"
                            style={{ paddingRight: "20px", width: "170px" }}
                          />
                          <TextField
                            id="email"
                            label="Email"
                            className={useStyles.textField}
                            value={this.state.email}
                            onChange={this.handleChange}
                            margin="normal"
                            style={{ paddingRight: "20px", width: "170px" }}
                          />
                          <TextField
                            id="phoneNumber"
                            label="Phone Number"
                            className={useStyles.textField}
                            value={this.state.phoneNumber}
                            onChange={this.handleChange}
                            margin="normal"
                            style={{ paddingRight: "20px", width: "170px" }}
                          />
                        </GridItem>
                        <br></br>
                        <GridItem xs={12}>
                          <Button
                            color="primary"
                            round
                            type="submit"
                            style={{ paddingRight: "20px" }}
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
          <p>Hello</p>
          <LeafletDraw></LeafletDraw>
        </Panel>
      </Tabs>
    );
  }
}

export default withStyles(dashboardStyle)(LicenseRequestsNew);
