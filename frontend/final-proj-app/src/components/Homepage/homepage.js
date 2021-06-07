import React from "react";
import Grid from "@material-ui/core/Grid";
import {
  Avatar,
  Box,
  Button,
  createMuiTheme,
  MuiThemeProvider,
  Typography,
} from "@material-ui/core";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#339639",
    },
    secondary: {
      main: "#339639",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: "70vh",
  },
  avatar: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  jumbotron: {
    height: "80vh",
    backgroundImage: `url(https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)`,
  },

  icons: {
    color: "#339639",
    width: "40px",
    height: "40px",
  },
  typography: {
    marginBottom: "10px",
  },

  marginTitle: {
    margin: "50px",
  },
  customerReview: {
    margin: theme.spacing(5),
  },
  serviceText: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(7),
    marginRight: theme.spacing(7),
  },

  blue: {
    backgroundColor: "#3F7DF1",
    height: theme.spacing(30),
    width: theme.spacing(30),
    margin: "1rem",
  },
  green: {
    backgroundColor: "#58CF45",
    height: theme.spacing(30),
    width: theme.spacing(30),
    margin: "1rem",
  },
  bluelight: {
    backgroundColor: "#4AD3D3",
    height: theme.spacing(30),
    width: theme.spacing(30),
    margin: "1rem",
  },
  orange: {
    backgroundColor: "#F1A457",
    height: theme.spacing(30),
    width: theme.spacing(30),
    margin: "1rem",
  },
  purple: {
    backgroundColor: "#B457F1",
    height: theme.spacing(30),
    width: theme.spacing(30),
    margin: "1rem",
  },
}));

const Homepage = () => {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={customTheme}>
      <Grid container direction="row">
        <Grid
          container
          item
          className={classes.jumbotron}
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12} align="center">
            <Typography variant="h2">SoftHeal</Typography>
            <Typography variant="h5" className={classes.typography}>
              Ready to boost your energy
            </Typography>
            <Button
              variant="contained"
              startIcon={<CreateIcon />}
              size="large"
              color="primary"
              href="/appointment"
            >
              Schedule an Appointment
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          item
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.root}
        >
          <Grid item xs={12} sm={4} align="center">
            <AccessTimeIcon className={classes.icons} />
            <Typography variant="h5" className={classes.typography}>
              Fast Appointment
            </Typography>
            <Typography variant="body1" className={classes.serviceText}>
              Our team of experts will find the perfect medical match for you in
              seconds. Start your recovery journey now.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4} align="center">
            <LocalHospitalIcon className={classes.icons} />
            <Typography variant="h5" className={classes.typography}>
              Customers First
            </Typography>
            <Typography variant="body1" className={classes.serviceText}>
              Our staff prioritizes the health of all our customers first, no
              more waits to get the medical attention you need.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} align="center">
            <MoneyOffIcon className={classes.icons} />
            <Typography variant="h5" className={classes.typography}>
              Free
            </Typography>
            <Typography variant="body1" className={classes.serviceText}>
              SotfHeal provides a free of charge appointment upon the first
              reservation, get ready to heal without worrying about the bill.
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          item
          className={classes.root}
          justify="center"
          alignItems="center"
        >
          <Typography variant="h4" className={classes.marginTitle}>
            Customer Reviews
          </Typography>
          <Grid item container justify="center">
            <Grid item xs={4} align="center">
              <Avatar alt="Kin" className={classes.blue}>
                <Typography variant="h3">K</Typography>
              </Avatar>
              <Typography
                component={"span"}
                variant="body1"
                color="textSecondary"
              >
                <Box
                  fontStyle="italic"
                  fontSize={16}
                  className={classes.customerReview}
                >
                  "As a programmer I get horrible neck pain. Thanks to
                  SoftHeal's special treatment I was healed" - Kin NG
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={4} align="center">
              <Avatar alt="f Sharp" className={classes.green}>
                <Typography variant="h3">N</Typography>
              </Avatar>

              <Typography component={"span"} color="textSecondary">
                <Box
                  fontStyle="italic"
                  fontSize={16}
                  className={classes.customerReview}
                >
                  "I got my Covid vaccine appointment scheduled in seconds!
                  absolutely amazing customer service" - Nhat Nam Nguyen
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={4} align="center">
              <Avatar alt="g Sharp" className={classes.bluelight}>
                <Typography variant="h3">R</Typography>
              </Avatar>
              <Typography
                component={"span"}
                variant="body1"
                color="textSecondary"
              >
                <Box
                  fontStyle="italic"
                  fontSize={16}
                  className={classes.customerReview}
                >
                  "I dislocated my shoulder during a gym session, but thanks to
                  SoftHeal I was able to get treatment immediately" - Roberto
                  Monge
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={4} align="center">
              <Avatar alt="Karla" className={classes.purple}>
                <Typography variant="h3">K</Typography>
              </Avatar>
              <Typography
                component={"span"}
                variant="body1"
                color="textSecondary"
              >
                <Box
                  fontStyle="italic"
                  fontSize={16}
                  className={classes.customerReview}
                >
                  "Their no charge on first date policy allowed me to clear my
                  concerns without having to worry about my financial situation"
                  - Karla Galue Colmenares
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={4} align="center">
              <Avatar alt="Lauren" className={classes.orange}>
                <Typography variant="h3">L</Typography>
              </Avatar>
              <Typography
                component={"span"}
                variant="body1"
                color="textSecondary"
              >
                <Box
                  fontStyle="italic"
                  fontSize={16}
                  className={classes.customerReview}
                >
                  "SofHeal allowed make my appointment to the doctor easy and
                  matched me with an specialized expert in seconds!" - Lauren
                  Wilusz
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
};

export default Homepage;
