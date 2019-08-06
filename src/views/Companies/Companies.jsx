import React from "react";
import CompanyService from "../../services/CompanyService";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Modal from "react-awesome-modal";
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

class Companies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companylist: [],
      fullName: "",
      type: "",
      registrationNumber: "",
      industry: "",
      headquarters: "",
      areaServed: "",
      website: "",
      email: "",
      phoneNumber: "",
      visible: false
    };
    this.companyService = new CompanyService();
  }
  openModal = () => {
    this.setState({
      visible: true
    });
  };
  closeModal = () => {
    this.setState({
      visible: false
    });
  };
  componentDidMount() {
    this.companyService.getAll().then(res => {
      this.setState({ companylist: res.companies });
      console.log(res.companies);
    });
  }
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const company = {
      fullName: this.state.fullName,
      type: this.state.type,
      registrationNumber: this.state.registrationNumber,
      industry: this.state.industry,
      headquarters: this.state.headquarters,
      areaServed: this.state.areaServed,
      website: this.state.website,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber
    };
    this.companyService
      .addCompany(company)
      .then(res => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <GridItem xs={12} sm={12} md={6}>
                  <h4 className={classes.cardTitleWhite}>Companies List</h4>
                </GridItem>
                <p className={classes.cardCategoryWhite}>
                  The list of cadaster companies
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={[
                    "Name",
                    "Country",
                    "Type",
                    "Industry",
                    "Web Site",
                    "registration Number"
                  ]}
                  tableData={this.state.companylist.map(company => [
                    company.fullName,
                    company.headquarters,
                    company.type,
                    company.industry,
                    company.website,
                    company.registrationNumber
                  ])}
                />
              </CardBody>
            </Card>
          </GridItem>
          <Modal
            visible={this.state.visible}
            width="800"
            height="500"
            effect="fadeInUp"
            onClickAway={() => this.closeModal()}
          >
            <GridItem xs={18} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Add a new Company</h4>
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
                          Add Company
                        </Button>
                        <Button
                          color="default"
                          round
                          onClick={this.closeModal}
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
          </Modal>
          <GridItem>
            <Button
              color="primary"
              onClick={this.openModal}
              style={{
                marginRight: "900px",
                position: "left"
              }}
            >
              New Company
            </Button>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
export default withStyles(dashboardStyle)(Companies);
