import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {
  CardMedia,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@material-ui/core";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";
import axios from "axios";

const UserAppointments = () => {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const data = {
      email: localStorage.getItem("email"),
    };
    const getAppointments = () => {
      axios
        .post("/api/appointments/retrieve", data)
        .then((res) => {
          setAppointments(res.data.appointments);
          console.log(res.data.appointments);
        })
        .catch();

      setLoading(false);
    };

    getAppointments();
  }, []);

  const removeAppointment = (id) => {
    const data = {
      email: localStorage.getItem("email"),
      _id: id,
    };
    axios
      .post("/api/appointments/delete", data)
      .then((res) => console.log(res));

    setAppointments(
      appointments.filter((appointment) => appointment._id !== id)
    );
  };

  // build custom themes for mui , use of themeProvider to apply the theme to the component
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#496dce",
      },
      secondary: {
        main: "#F14F3F",
      },
    },
  });

  // create styles
  const useStyles = makeStyles((theme) => ({
    gridContainer: {
      height: "30vh",
    },
    gridItemContainer: {
      margin: theme.spacing(4),
    },
    animeImage: {
      height: "300px",
      width: "225px",
      objectFit: "cover",
    },

    paper: {
      width: "100%",
      height: "100%",
      display: "flex",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    loadingScreen: {
      display: "flex",
      flexDirection: "column",
      margin: "450px 200px",
      alignItems: "center",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  }));

  const classes = useStyles();

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <div className={classes.loadingScreen}>
          <CircularProgress />
        </div>
      </ThemeProvider>
    );
  }
  let appointmentImage =
    "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
  return (
    <Grid container>
      {appointments.map((appointment) => {
        return (
          <Grid
            item
            container
            xs={12}
            key={appointment._id}
            className={classes.gridItemContainer}
          >
            <ThemeProvider theme={theme}>
              <Paper elevation={1} className={classes.paper}>
                <Grid item xs={3}>
                  <CardMedia
                    component="img"
                    alt=""
                    height="250"
                    image={appointmentImage}
                  />
                </Grid>
                <Grid item container xs={8} align="center">
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      Patient: {appointment.firstName} {appointment.lastName}
                    </Typography>
                  </Grid>
                  <Divider />
                  <Grid item container xs={12}>
                    <Grid item xs={4}>
                      <Typography variant="subtitle1">
                        Gender: {appointment.gender}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="subtitle1">
                        DoB: {appointment.birthDate}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="subtitle1">
                        Insurance Type:
                        {appointment.insurance === "regularInsurance"
                          ? "R"
                          : appointment.insurance === "premiumInsurance"
                          ? "PR"
                          : "S"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      Motive: {appointment.description}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={3}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12} align="center">
                    <Typography variant="subtitle1">
                      Appointment Date: {appointment.appointmentDate}
                    </Typography>
                  </Grid>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<ClearIcon />}
                    onClick={() => removeAppointment(appointment._id)}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Paper>
            </ThemeProvider>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default UserAppointments;
