import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Homepage from "./components/Homepage/homepage";
import Navbar from "./components/NavBar/NavBar";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Schedulepage from "./components/Scheduler/schedulepage";
import MyAppointments from "./components/userAppointments/UserAppointments";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

const App = () => {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Provider store={store}>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/about" component={About} />
              <PrivateRoute path="/myAppointments" component={MyAppointments} />
              <PrivateRoute path="/appointment" component={Schedulepage} />
              <Route path="*">Error page</Route>
            </Switch>
          </Router>
          <Footer />
        </Provider>
      </div>
    </div>
  );
};

export default App;
