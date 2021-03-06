import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    background: "#339639",
  },
  typography: {
    color: "#fff",
  },
}));

function Copyright() {
  const classes = useStyles();
  return (
    <Typography variant="body2" className={classes.typography}>
      {"Copyright © "}
      <Link color="inherit" href="/">
        SoftBois
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1" className={classes.typography}>
            Images from Google
          </Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
