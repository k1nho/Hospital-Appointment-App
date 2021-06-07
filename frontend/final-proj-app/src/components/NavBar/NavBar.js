import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavbarComponents";
import { logoutUser } from "../../actions/authActions";

class NavBar extends React.Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <Nav>
        <NavLink to="/">
          <h1>SoftHeal</h1>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/" activestyle="true">
            Home
          </NavLink>
          <NavLink to="/appointment" activestyle="true">
            Appointment
          </NavLink>
          <NavLink to="/about" activestyle="true">
            About
          </NavLink>
        </NavMenu>
        {this.props.auth.isAuthenticated === true ? (
          <NavBtn>
            <NavBtnLink to="/myAppointments">My Appointments</NavBtnLink>
            <NavBtnLink to="/logout" onClick={this.onLogoutClick}>
              Logout
            </NavBtnLink>
          </NavBtn>
        ) : (
          <NavBtn>
            <NavBtnLink to="/login">Login</NavBtnLink>
            <NavBtnLink to="/register">Sign Up</NavBtnLink>
          </NavBtn>
        )}
      </Nav>
    );
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(NavBar);
