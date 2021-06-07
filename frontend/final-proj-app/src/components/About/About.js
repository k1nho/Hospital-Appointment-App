import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  createMuiTheme,
  MuiThemeProvider,
  Typography,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { data } from "../../DataAbout";

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
  gridCustom: {
    maxWidth: 380,
    margin: "30px 30px",
  },

  root: {
    height: "30vh",
  },
  avatar: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  jumbotron: {
    marginTop: "50px",
    marginBottom: "60px",
  },

  icons: {
    color: "#339639",
    width: "40px",
    height: "40px",
  },
  typography: {
    marginBottom: "10px",
  },
  textParagraph: {
    marginLeft: theme.spacing(12),
    marginRight: theme.spacing(12),
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
  sizeAvatar: {
    height: theme.spacing(50),
    width: theme.spacing(50),
    margin: "1rem",
  },
}));

const About = () => {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={customTheme}>
      <Grid container direction="row">
        <Grid
          container
          item
          xs={12}
          className={classes.jumbotron}
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12} sm={12} md={4} align="center">
            <Avatar
              alt="medicine"
              src="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              className={classes.sizeAvatar}
            >
              picture
            </Avatar>
          </Grid>
          <Grid item xs={12} sm={12} md={8} align="center">
            <Typography variant="h5" className={classes.typography}>
              Medicine And Software At Its Core
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              className={classes.textParagraph}
            >
              SoftHeal is a biomedical company that provides cutting edge
              techonology to medics all around the world while at the same time
              providing microservices to patients that allow them to schedule an
              appointment as soon as possible. The staff is dedicated to the
              give the best treatment to our clients, and we make sure you feel
              better as soon as your appointment is scheduled. Our company makes
              use of engineering power along with medical research to determine
              the best course of action for you.
            </Typography>
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
          <Typography variant="h4"> Services</Typography>
          <Grid container direction="row">
            {data.map((service) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={service.id}
                  align="center"
                >
                  <Card variant="outlined" className={classes.gridCustom}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt=""
                        height="250"
                        image={service.image}
                        title={service.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                          {service.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          align="center"
                        >
                          {service.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="large" color="primary">
                        {service.cost}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
};

export default About;
