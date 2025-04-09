const express = require("express");
const { register, login } = require("../controllers/authController");
const { verifyCaptcha } = require("../middleware/recaptcha");
const { authenticate, checkRole } = require("../middleware/auth");
const {
  getPatientAppointments,
  createPatientAppointment,
  createGuestAppointment,
  getDoctorAppointments,
  updateAppointmentStatus,
  getAllAppointments,
  createAdminAppointment,
} = require("../controllers/AppointmentController");

const router = express.Router();

// Patient registration (with CAPTCHA)
router.post("/register", register);

// Login for all roles (with CAPTCHA)
router.post("/login", login);

// Patient routes
router.get("/appointments", authenticate, getPatientAppointments);
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

// Admin routes
router.get(
  "/admin/appointments",
  authenticate,
  checkRole("admin"),
  getAllAppointments
);
router.post(
  "/admin/appointments",
  authenticate,
  checkRole("admin"),
  createAdminAppointment
);

module.exports = router;
