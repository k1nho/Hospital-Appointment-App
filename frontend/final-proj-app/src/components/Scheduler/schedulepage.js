import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import { Formik, Form, useField, useFormikContext } from "formik";
import {
  Button,
  createMuiTheme,
  FormLabel,
  makeStyles,
  MuiThemeProvider,
  Radio,
  Typography,
  Container,
  Paper,
  MenuItem,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import * as yup from "yup";
import Loading from "../Loading/loading";

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
  formContainer: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
  typography: {
    marginTop: theme.spacing(5),
  },
  fieldContainer: {
    marginBottom: theme.spacing(4),
  },
}));

//custom fields to match properties of MUI components
const CustomTextField = ({
  placeholder,
  variant,
  multiline,
  rows,
  ...props
}) => {
  const [field, meta] = useField(props);

  // text field validation
  const errorMessage = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...field}
      fullWidth
      multiline={multiline}
      rows={rows}
      variant={variant}
      placeholder={placeholder}
      helperText={errorMessage}
      error={!!errorMessage}
    ></TextField>
  );
};

const CustomSelect = ({ name, options, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const handleChange = (e) => {
    const { value } = e.target;
    setFieldValue(name, value);
  };

  const configSelect = {
    ...field,
    ...props,
    select: true,
    variant: "outlined",
    fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField {...configSelect}>
      {Object.keys(options).map((item, index) => {
        return (
          <MenuItem key={index} value={item}>
            {options[item]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

const CustomCheckbox = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <FormControlLabel
      {...field}
      label={label}
      control={<Checkbox />}
    ></FormControlLabel>
  );
};

const CustomRadio = ({ label, ...props }) => {
  const [field] = useField(props);

  return (
    <FormControlLabel
      {...field}
      control={<Radio />}
      label={label}
    ></FormControlLabel>
  );
};

const CustomDateTimePicker = ({ name, type, ...props }) => {
  const [field, meta] = useField(name);

  const configDateTimePicker = {
    ...field,
    ...props,
    variant: "outlined",
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return <TextField {...configDateTimePicker} type={type}></TextField>;
};

// validation
const validate = yup.object({
  firstName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .max(40)
    .required("First Name is required"),
  lastName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid last name")
    .max(40)
    .required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is a required field"),
  appointmentDate: yup.date().required("Please Select an Appointment Date"),
  insurance: yup.string().required(),
  birthDate: yup.date().required("Please Provide Your Date of Birth"),
});

const INITFORM = {
  firstName: "",
  lastName: "",
  gender: "male",
  birthDate: "",
  description: "",
  email: "",
  insurance: "",
  medConditions: [],
  appointmentDate: "",
};

const Schedulepage = (props) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Paper elevation={3}>
      <Grid container>
        <Grid item xs={12} align="center" className={classes.typography}>
          <Typography variant="h5">
            Welcome to the Appointment Scheduler
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Container maxwidth="md">
            <div className={classes.formContainer}>
              <Formik
                initialValues={{
                  ...INITFORM,
                }}
                onSubmit={(data, { setSubmitting, resetForm }) => {
                  setSubmitting(true);
                  setTimeout(() => {
                    // async calls
                    setSubmitting(false);
                    axios
                      .post("/api/appointments/schedule", data)
                      .then((res) => history.push("/appointment")) // re-direct to appointment form on successful schedule
                      .catch();

                    resetForm({});
                  }, 1000);
                }}
                validationSchema={validate}
              >
                {({ values, isSubmitting, errors }) => (
                  <Form>
                    <MuiThemeProvider theme={customTheme}>
                      {isSubmitting && <Loading />}
                      <Grid
                        container
                        spacing={2}
                        className={classes.fieldContainer}
                      >
                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            placeholder="First Name"
                            type="input"
                            name="firstName"
                            variant="outlined"
                          ></CustomTextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <CustomTextField
                            placeholder="Last Name"
                            type="input"
                            name="lastName"
                            variant="outlined"
                          ></CustomTextField>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        justify="center"
                        className={classes.fieldContainer}
                      >
                        <Grid item xs={12}>
                          <CustomTextField
                            placeholder="Email"
                            type="input"
                            name="email"
                            variant="outlined"
                          ></CustomTextField>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        justify="center"
                        className={classes.fieldContainer}
                      >
                        <Grid item xs={12}>
                          <CustomSelect
                            name="insurance"
                            label="Insurance"
                            options={{
                              premiumInsurance: "Premium Insurance",
                              regularInsurance: "Regular Insurance",
                              studentInsurance: "Student Insurance",
                            }}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        justify="center"
                        className={classes.fieldContainer}
                      >
                        <FormLabel component="legend">Gender</FormLabel>
                        <Grid container item justify="center">
                          <CustomRadio
                            name="gender"
                            value="male"
                            type="radio"
                            label="Male"
                          ></CustomRadio>
                          <CustomRadio
                            name="gender"
                            value="female"
                            type="radio"
                            label="Female"
                          ></CustomRadio>
                          <CustomRadio
                            name="gender"
                            value="other"
                            type="radio"
                            label="Other"
                          ></CustomRadio>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        justify="center"
                        className={classes.fieldContainer}
                      >
                        <CustomDateTimePicker
                          name="birthDate"
                          label="Date of Birth"
                          type="date"
                        />
                      </Grid>
                      <Grid
                        container
                        justify="center"
                        className={classes.fieldContainer}
                      >
                        <FormLabel component="legend">
                          Medical Conditions (Select All That Might Apply)
                        </FormLabel>

                        <Grid container item justify="center">
                          <CustomCheckbox
                            name="medConditions"
                            value="flu"
                            type="checkbox"
                            label="Flu"
                          ></CustomCheckbox>
                          <CustomCheckbox
                            name="medConditions"
                            value="covid"
                            type="checkbox"
                            label="Covid"
                          ></CustomCheckbox>
                          <CustomCheckbox
                            name="medConditions"
                            value="anemia"
                            type="checkbox"
                            label="Anemia"
                          ></CustomCheckbox>
                          <CustomCheckbox
                            name="medConditions"
                            value="abdominal pain"
                            type="checkbox"
                            label="Abdominal Pain"
                          ></CustomCheckbox>
                          <CustomCheckbox
                            name="medConditions"
                            value="dizziness"
                            type="checkbox"
                            label="Dizziness"
                          ></CustomCheckbox>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        justify="center"
                        className={classes.fieldContainer}
                      >
                        <Grid item xs={12}>
                          <CustomTextField
                            placeholder="Please Provide Detailed Information About your Symptomps"
                            type="input"
                            name="description"
                            variant="outlined"
                            multiline={true}
                            rows={4}
                          ></CustomTextField>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        justify="center"
                        className={classes.fieldContainer}
                      >
                        <CustomDateTimePicker
                          name="appointmentDate"
                          label="Appointment Date"
                          type="datetime-local"
                        />
                      </Grid>
                      <Grid container justify="center">
                        <Button
                          disabled={isSubmitting}
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                        >
                          Submit
                        </Button>
                      </Grid>
                    </MuiThemeProvider>
                  </Form>
                )}
              </Formik>
            </div>
          </Container>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Schedulepage;
