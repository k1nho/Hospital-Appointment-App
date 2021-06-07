import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
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

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Grid container justify="center" alignItems="center">
          <div className="container">
            <div style={{ marginTop: "4rem" }} className="row">
              <div className="col s8 offset-s2">
                <Typography variant="h4">Register Below</Typography>
                <Typography variant="body1" color="textSecondary">
                  Already have an account?
                  <Link to="/login">Login</Link>
                </Typography>
                <form noValidate onSubmit={this.onSubmit}>
                  <Grid item xs={12}>
                    <Typography variant="body1">Name</Typography>
                    <input
                      onChange={this.onChange}
                      value={this.state.name}
                      error={errors.name}
                      id="name"
                      type="text"
                      className={classnames("", {
                        invalid: errors.name,
                      })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">Email</Typography>
                    <input
                      onChange={this.onChange}
                      value={this.state.email}
                      error={errors.email}
                      id="email"
                      type="email"
                      className={classnames("", {
                        invalid: errors.email,
                      })}
                    />

                    <span className="red-text">{errors.email}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">Password</Typography>
                    <input
                      onChange={this.onChange}
                      value={this.state.password}
                      error={errors.password}
                      id="password"
                      type="password"
                      className={classnames("", {
                        invalid: errors.password,
                      })}
                    />

                    <span className="red-text">{errors.password}</span>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">Confirm Password</Typography>
                    <input
                      onChange={this.onChange}
                      value={this.state.password2}
                      error={errors.password2}
                      id="password2"
                      type="password"
                      className={classnames("", {
                        invalid: errors.password2,
                      })}
                    />

                    <span className="red-text">{errors.password2}</span>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ marginTop: "20px" }}
                    >
                      Sign Up
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
