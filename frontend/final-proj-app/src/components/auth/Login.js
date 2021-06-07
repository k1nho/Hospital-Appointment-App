import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import Grid from "@material-ui/core/Grid";
import { Button, Typography } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#297a2e",
    },
    secondary: {
      main: "#F14F3F",
    },
  },
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Grid container justify="center">
          <div className="container">
            <div style={{ marginTop: "4rem" }} className="row">
              <div className="col s8 offset-s2">
                <Typography variant="h4">Login Below</Typography>
                <Typography variant="body1" color="textSecondary">
                  Don't have an account?
                  <Link to="/register">Register</Link>
                </Typography>

                <form noValidate onSubmit={this.onSubmit}>
                  <Grid item xs={12}>
                    <Typography variant="h6">Email</Typography>
                    <input
                      onChange={this.onChange}
                      value={this.state.email}
                      error={errors.email}
                      id="email"
                      type="email"
                      className={classnames("", {
                        invalid: errors.email || errors.emailnotfound,
                      })}
                    />
                    <span className="red-text">
                      {errors.email}
                      {errors.emailnotfound}
                    </span>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">Password</Typography>
                    <input
                      onChange={this.onChange}
                      value={this.state.password}
                      error={errors.password}
                      id="password"
                      type="password"
                      className={classnames("", {
                        invalid: errors.password || errors.passwordincorrect,
                      })}
                    />

                    <span className="red-text">
                      {errors.password}
                      {errors.passwordincorrect}
                    </span>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ marginTop: "20px" }}
                    >
                      Login
                    </Button>
                  </Grid>
                </form>
              </div>
            </div>
          </div>
        </Grid>
      </ThemeProvider>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
