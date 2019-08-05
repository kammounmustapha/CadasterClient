import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Danger from "components/Typography/Danger.jsx";
import AuthService from "../layouts/AuthService";
export default class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorText: ""
    };
    this.authService = new AuthService();
  }
  componentWillMount() {
    if (this.authService.loggedIn()) this.props.history.replace("/");
  }
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.authService
      .login(this.state.email, this.state.password)
      .then(res => {
        this.props.history.replace("/dashboard");
      })
      .catch(err => {
        this.setState({
          email: "",
          password: "",
          errorText: "Invalid data"
        });
      });
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={this.classes.paper}>
          <Avatar className={this.classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={this.classes.form}
            noValidate
            onSubmit={this.handleSubmit}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleChange}
              value={this.state.email}
              error={this.state.errorText}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleChange}
              value={this.state.password}
              error={this.state.errorText}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.classes.submit}
              disabled={!this.validateForm()}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    );
  }
  classes = makeStyles(theme => ({
    "@global": {
      body: {
        backgroundColor: theme.palette.common.blue
      }
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: theme.palette.secondary.main
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  }));
}
