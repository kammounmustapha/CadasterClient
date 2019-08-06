/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import AuthService from "layouts/AuthService";
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

function UserProfile(props) {
  const { classes, current_user } = props;
  const authService = new AuthService();
  const user = authService.getProfile();
  const options = [
    { value: "1", label: "Permit Application" },
    { value: "2", label: "Cadaster Manager" },
    { value: "3", label: "Admin" },
    { value: "4", label: "Super Admin" }
  ];

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}> </h4>
              <p className={classes.cardCategoryWhite}>Add a user</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Company (disabled)"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={
                      {
                        // disabled: true
                      }
                    }
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField
                    id="standard-password-input"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={1}>
                  <Select>
                    <MenuItem value={10}>Cadaster Manager</MenuItem>
                    <MenuItem value={20}>Licence Applier</MenuItem>
                    <MenuItem value={30}>Administrator</MenuItem>
                  </Select>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Create Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardBody profile>
              <h5 className={classes.cardCategory}>
                {user.email.toLowerCase()}
              </h5>
              <h4 className={classes.cardTitle}>{user.fullName}</h4>

              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

UserProfile.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(UserProfile);
