const express = require("express");
const router = express.Router();

// ✅ Import Controllers
const paymentController = require("../controllers/paymentController");

// ===============================
// 🔹 Payment Routes ONLY
// ===============================
router.get("/test", paymentController.testPayment); // ✅ Endpoint test
router.post("/order", paymentController.createOrder); // ✅ Live Razorpay Order
router.post("/order-mock", paymentController.createMockOrder); // ✅ Mock Order for testing
router.post("/verify", paymentController.verifyPayment); // ✅ Payment Verification

// ===============================
// ✅ Debug Route (optional)
// ===============================
router.get("/debug/env", (req, res) => {
  res.json({
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID ? "✅ Loaded" : "❌ Missing",
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET ? "✅ Loaded" : "❌ Missing",
    MODE: process.env.NODE_ENV || "development",
  });
});

module.exports = router;
