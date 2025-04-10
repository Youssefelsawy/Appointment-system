const express = require("express");
const { register, login } = require("../controllers/authController");
const verifyCaptcha = require("../middleware/recaptcha");
const { authenticate, checkRole } = require("../middleware/auth");
const {
  getPatientAppointments,
  createPatientAppointment,
  createGuestAppointment,
  getDoctorAppointments,
  updateAppointmentStatus,
  getAllDoctors,
} = require("../controllers/AppointmentController");

const router = express.Router();

// Patient registration (with CAPTCHA)
router.post("/register", verifyCaptcha, register);

// Login for all roles (with CAPTCHA)
router.post("/login", verifyCaptcha, login);

// Patient routes
router.get("/appointments", authenticate, getPatientAppointments);
router.get("/doctors", authenticate, getAllDoctors);
router.post("/appointments", authenticate, createPatientAppointment);
router.post("/appointments/guest", createGuestAppointment);

// Doctor routes
router.get(
  "/doctor/appointments",
  authenticate,
  checkRole("doctor"),
  getDoctorAppointments
);
router.put(
  "/doctor/appointments/status",
  authenticate,
  checkRole("doctor"),
  updateAppointmentStatus
);

module.exports = router;
