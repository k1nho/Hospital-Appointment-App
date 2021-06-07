const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateScheduleInput = require("../../validation/schedule");

// @route POST api/appointments/schedule
// @desc Schedule appointment
// @access Public
router.post("/schedule", (req, res) => {
  // Form validation
  const { errors, isValid } = validateScheduleInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    const newAppointment = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      birthDate: req.body.birthDate,
      description: req.body.description,
      email: req.body.email,
      insurance: req.body.insurance,
      medConditions: req.body.medConditions,
      appointmentDate: req.body.appointmentDate,
    };

    user.appointments.push(newAppointment);
    user
      .save()
      .then((user) => res.json(user))
      .catch((err) => console.log(err));
  });
});

// @route POST api/appointments/retrieve
// @desc Retrieve appointments
// @access Public
router.post("/retrieve", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      res.status(400);
    } else {
      res.json({
        appointments: user.appointments,
      });
    }
  });
});

// @route POST api/appointments/schedule
// @desc Schedule appointment
// @access Public
router.post("/delete", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    const removedAppointment_id = req.body._id;

    user.appointments.pull({_id: removedAppointment_id});
    user
      .save()
      .then((user) => res.json(user))
      .catch((err) => console.log(err));
  });
});

module.exports = router;
