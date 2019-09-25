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
import { width } from "@material-ui/system";

const options = [
  { value: "1", label: "Permit Applicant" },
  { value: "2", label: "Cadastral Manager" },
  { value: "3", label: "Administrative" }
];
class Users extends React.Component {
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
        this.props.history.replace("/users");
      })
      .catch(err => {
        console.log(err);
        this.setState({});
      });
  };
  getName(role) {
    for (var i = 0; i < options.length; i++) {
      // look for the entry with a matching `code` value
      if (options[i].value == role) {
        return options[i].label;
      }
    }
  }
  render() {
    const { classes } = this.props;
    const { role } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
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
                    <b>{this.getName(element.role)}</b>,
                    element.email
                  ])}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
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
                          style={{ paddingRight: "20px", width: "170px" }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={8}>
                        <TextField
                          label="Email"
                          id="email"
                          required
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.email}
                          style={{
                            paddingRight: "40px",
                            marginLeft: "80px",
                            width: "270px"
                          }}
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
                          style={{
                            paddingRight: "20px",
                            height: "70px",
                            width: "170px"
                          }}
                        />
                      </GridItem>
                      <GridItem
                        style={{
                          width: "400px"
                        }}
                      >
                        <Select
                          value={role}
                          onChange={this.handleChange2}
                          options={options}
                          placeholder="Role"
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer></GridContainer>
                  </CardBody>
                  <CardFooter>
                    <Button color="warning" type="submit">
                      Add User
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

Users.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Users);
