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
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
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
      message: false,
      companylist: [],
      companylistFinal: [],
      companyText: "",
      fullName: "",
      type: "",
      registrationNumber: "",
      industry: "",
      headquarters: "",
      areaServed: "",
      website: "",
      email: "",
      phoneNumber: "",
      fullNameNew: "",
      typeNew: "",
      registrationNumberNew: "",
      industryNew: "",
      headquartersNew: "",
      areaServedNew: "",
      websiteNew: "",
      emailNew: "",
      phoneNumberNew: "",
      visible: false,
      visibleEdit: false,
      companyEditId: ""
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
      visible: false,
      visibleEditModal: false
    });
  };

  componentDidMount() {
    this.companyService.getAll().then(res => {
      this.setState({
        companylist: res.companies,
        companylistFinal: res.companies
      });
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

  filterCompanies = e => {
    var updatedList = this.state.companylist;
    updatedList = updatedList.filter(item => {
      return (
        item.fullName
          .toString()
          .toLowerCase()
          .search(e.target.value.toString().toLowerCase()) !== -1
      );
    });
    this.setState({
      companylistFinal: updatedList
    });
    if (updatedList == 0) {
      this.setState({
        message: true
      });
    } else {
      this.setState({
        message: false
      });
    }
  };
  handleEdit = company => {
    console.log(company.areaServed);
    this.setState({
      companyEditId: company._id,
      fullNameNew: company.fullName,
      typeNew: company.type,
      registrationNumberNew: company.registrationNumber,
      industryNew: company.industry,
      headquartersNew: company.headquarters,
      areaServedNew: company.areaServed,
      websiteNew: company.website,
      emailNew: company.email,
      phoneNumberNew: company.phoneNumber,
      visibleEditModal: true
    });
  };
  handleEditSubmit = event => {
    event.preventDefault();
    const updatedCompay = {
      fullName: this.state.fullNameNew,
      type: this.state.typeNew,
      registrationNumber: this.state.registrationNumberNew,
      industry: this.state.industryNew,
      headquarters: this.state.headquartersNew,
      areaServed: this.state.areaServedNew,
      website: this.state.websiteNew,
      email: this.state.emailNew,
      phoneNumber: this.state.phoneNumberNew
    };
    // console.log(updatedCompay);
    const id = this.state.companyEditId;
    console.log(id);
    this.companyService
      .updateCompany(id, updatedCompay)
      .then(res => {
        console.log(res);
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
                <TextField
                  id="search"
                  label="Search"
                  type="search"
                  className={classes.textField}
                  margin="normal"
                  onChange={this.filterCompanies}
                />
                {this.state.message ? <li>No search results.</li> : ""}
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
                  tableData={this.state.companylistFinal.map(company => [
                    <b>{company.fullName}</b>,
                    <b>{company.headquarters}</b>,
                    <b>{company.type}</b>,
                    <b>{company.industry}</b>,
                    <b>{company.website}</b>,
                    <b>{company.registrationNumber}</b>,
                    <Fab
                      color="secondary"
                      aria-label="edit"
                      onClick={this.handleEdit.bind(this, company)}
                    >
                      <Icon>edit_icon</Icon>
                    </Fab>
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

          <Modal
            visible={this.state.visibleEditModal}
            width="800"
            height="500"
            effect="fadeInUp"
            onClickAway={this.closeModal}
          >
            <GridItem xs={18} sm={12} md={12}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Edit Company</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <form
                      className={classes.container}
                      noValidate
                      onSubmit={this.handleEditSubmit}
                    >
                      <GridItem xs={6} sm={12} md={12}>
                        <TextField
                          id="fullNameNew"
                          label="Name"
                          className={classes.textField}
                          value={this.state.fullNameNew}
                          onChange={this.handleChange}
                          margin="normal"
                          style={{ paddingRight: "20px", width: "170px" }}
                        />
                        <TextField
                          id="typeNew"
                          label="Type"
                          className={classes.textField}
                          value={this.state.typeNew}
                          onChange={this.handleChange}
                          margin="normal"
                          style={{ paddingRight: "20px", width: "170px" }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          id="registrationNumberNew"
                          label="Registration Number"
                          className={classes.textField}
                          value={this.state.registrationNumberNew}
                          onChange={this.handleChange}
                          margin="normal"
                          style={{ paddingRight: "20px", width: "170px" }}
                        />
                        <TextField
                          id="industryNew"
                          label="Industry"
                          className={useStyles.textField}
                          value={this.state.industryNew}
                          onChange={this.handleChange}
                          margin="normal"
                          style={{ paddingRight: "20px", width: "170px" }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          id="headquartersNew"
                          label="Headquarters"
                          className={useStyles.textField}
                          value={this.state.headquartersNew}
                          onChange={this.handleChange}
                          margin="normal"
                        />
                        <TextField
                          id="areaServedNew"
                          label="Served Area"
                          className={useStyles.textField}
                          value={this.state.areaServedNew}
                          onChange={this.handleChange}
                          margin="normal"
                          style={{ paddingRight: "20px", width: "170px" }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <TextField
                          id="websiteNew"
                          label="Web Site"
                          className={useStyles.textField}
                          value={this.state.websiteNew}
                          onChange={this.handleChange}
                          margin="normal"
                          style={{ paddingRight: "20px", width: "170px" }}
                        />
                        <TextField
                          id="emailNew"
                          label="Email"
                          className={useStyles.textField}
                          value={this.state.emailNew}
                          onChange={this.handleChange}
                          margin="normal"
                          style={{ paddingRight: "20px", width: "170px" }}
                        />
                        <TextField
                          id="phoneNumberNew"
                          label="Phone Number"
                          className={useStyles.textField}
                          value={this.state.phoneNumberNew}
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
                          Apply Changes
                        </Button>
                        <Button
                          color="default"
                          round
                          onClick={this.closeModal}
                          style={{ marginLeft: "30px" }}
                        >
                          Discard
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
