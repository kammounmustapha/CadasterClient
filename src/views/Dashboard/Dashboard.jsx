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
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Button from "components/CustomButtons/Button.jsx";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Select from "react-select";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import AuthService from "../../layouts/AuthService";

const options = [
  { value: "1", label: "Permit Application" },
  { value: "2", label: "Cadaster Manager" },
  { value: "3", label: "Admin" }
];
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      users: [],
      fullName: "",
      email: "",
      password: "",
      role: ""
    };
    this.authService = new AuthService();
  }

  componentDidMount() {
    this.authService.getAllUsers().then(res => {
      this.setState({ users: res.data });
    });
  }

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  handleChange2 = role => {
    this.setState({ role });
    console.log(`Option selected:`, role);
  };
  handleSubmit = event => {
    event.preventDefault();
    const user = {
      fullName: this.state.fullName,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role.value
    };
    //    console.log(user);

    this.authService
      .addUser(user)
      .then(res => {
        console.log(res);
        this.props.history.replace("/dashboard");
      })
      .catch(err => {
        console.log(err);
        this.setState({});
      });
  };
  render() {
    const { classes } = this.props;
    const { role } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Users</h4>
                <p className={classes.cardCategoryWhite}>Users of the system</p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Role", "email"]}
                  tableData={this.state.users.map((element, i = 0) => [
                    i + 1,
                    element.fullName,
                    element.role,
                    element.email
                  ])}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={6} sm={12} md={12}>
            <CardBody>
              <Card>
                <CardHeader color="warning">
                  <h4 className={classes.cardTitleWhite}>Add new User</h4>
                </CardHeader>
                <form onSubmit={this.handleSubmit}>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <TextField
                          label="Username"
                          required
                          id="fullName"
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.fullName}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          label="Email address"
                          id="email"
                          required
                          name="email-address"
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.email}
                        />
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <TextField
                          id="password"
                          label="Password"
                          className={classes.textField}
                          type="password"
                          margin="normal"
                          required
                          onChange={this.handleChange}
                          value={this.state.password}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <label>Role</label>
                        <Select
                          value={role}
                          onChange={this.handleChange2}
                          options={options}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer></GridContainer>
                  </CardBody>
                  <CardFooter>
                    <Button color="warning" type="submit">
                      Create Profile
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </CardBody>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
