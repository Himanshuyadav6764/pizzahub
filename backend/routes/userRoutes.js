const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  authUser,
  getUserProfile,
  getAuthStatus,
  forgotPassword,
  resetPassword
} = require("../controllers/userController");

// ===============================
// 🔹 Public User Routes
// ===============================
router.post("/", registerUser); // ✅ Register
router.post("/login", authUser); // ✅ Login (fixed: was loginUser, now authUser)
router.post("/forgot-password", forgotPassword); // ✅ Forgot Password
router.put("/reset-password/:token", resetPassword); // ✅ Reset Password

// ===============================
// 🔹 Protected User Routes
// ===============================
router.get("/profile", protect, getUserProfile); // ✅ Get Profile
router.get("/status", protect, getAuthStatus); // ✅ Check Auth Status (fixed: was checkAuthStatus, now getAuthStatus)

module.exports = router;