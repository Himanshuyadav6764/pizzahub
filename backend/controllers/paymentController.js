const Razorpay = require("razorpay");
const crypto = require("crypto");

// 🔧 Log Razorpay env keys load hua ya nahi
console.log("🔧 Initializing Razorpay...");
console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID ? "✅ Loaded" : "❌ Missing");
console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET ? "✅ Loaded" : "❌ Missing");

// ✅ Razorpay instance (production / staging me env se keys leke)
let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  console.log("✅ Razorpay instance created");
  
  // Test Razorpay connection
  (async () => {
    try {
      console.log("🔍 Testing Razorpay connection...");
      // Test with a minimal request - just check if we can create a small order
      const testOptions = {
        amount: 100, // 1 rupee in paise
        currency: 'INR',
        receipt: `test_receipt_${Date.now()}`,
      };
      const testOrder = await razorpay.orders.create(testOptions);
      console.log("✅ Razorpay connection test successful:", testOrder.id);
    } catch (testError) {
      console.error("❌ Razorpay connection test failed:");
      console.error("Test error details:", {
        message: testError.message,
        statusCode: testError.statusCode,
        error: testError.error,
        stack: testError.stack
      });
    }
  })();
} else {
  console.log("⚠️ Razorpay keys missing, only mock API will work!");
}

// ✅ Test endpoint
exports.testPayment = (req, res) => {
  res.json({
    message: "✅ Payment endpoint is working!",
    timestamp: new Date().toISOString(),
  });
};

// ✅ Create Order API (live Razorpay)
exports.createOrder = async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(503).json({
        error: "Razorpay not configured",
        details: "Missing API keys. Use /order-mock for testing.",
      });
    }

    console.log("🔧 Creating Razorpay order...");
    console.log("📦 Request body:", req.body);

    const { amount, currency = "INR" } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        error: "Invalid amount",
        details: "Amount must be greater than 0",
      });
    }

    const options = {
      amount: Math.round(amount * 100), // paise
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    console.log("📋 Razorpay options:", options);

    const order = await razorpay.orders.create(options);

    console.log("✅ Razorpay order created:", order);
    res.json(order);

  } catch (error) {
    console.error("❌ Error creating order:");
    console.error("Full error object:", error);
    console.error("Error type:", typeof error);
    console.error("Error constructor:", error.constructor.name);
    
    // Log all error properties
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      description: error.description,
      statusCode: error.statusCode,
      error: error.error,
      stack: error.stack,
    });

    res.status(500).json({
      error: "Failed to create Razorpay order",
      details: error.message || error.toString() || "Unknown error",
      code: error.code,
      statusCode: error.statusCode,
      fullError: error.error,
    });
  }
};

// ✅ Mock Order API (testing fallback)
exports.createMockOrder = async (req, res) => {
  try {
    console.log("🎭 Creating mock order...");
    console.log("📦 Request body:", req.body);

    const { amount, currency = "INR" } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        error: "Invalid amount",
        details: "Amount must be greater than 0",
      });
    }

    // Create a mock order response similar to Razorpay
    const mockOrder = {
      id: `order_mock_${Date.now()}`,
      entity: "order",
      amount: Math.round(amount * 100), // paise
      amount_paid: 0,
      amount_due: Math.round(amount * 100),
      currency: currency,
      receipt: `receipt_mock_${Date.now()}`,
      status: "created",
      attempts: 0,
      created_at: Math.floor(Date.now() / 1000),
    };

    console.log("✅ Mock order created:", mockOrder);
    res.json(mockOrder);

  } catch (error) {
    console.error("❌ Error creating mock order:", error);
    res.status(500).json({
      error: "Failed to create mock order",
      details: error.message,
    });
  }
};

// ✅ Verify Payment API
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing required payment fields" });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      console.log("✅ Payment verified successfully");
      return res.json({ success: true, message: "Payment verified successfully" });
    } else {
      console.log("❌ Payment verification failed");
      return res.status(400).json({ success: false, error: "Invalid signature" });
    }
  } catch (error) {
    console.error("❌ Error verifying payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Mock Order (for testing without Razorpay keys)
exports.createOrderMock = async (req, res) => {
  try {
    const { amount = 100, currency = "INR" } = req.body;

    const mockOrder = {
      id: `order_mock_${Date.now()}`,
      entity: "order",
      amount: amount * 100,
      amount_paid: 0,
      amount_due: amount * 100,
      currency,
      receipt: `receipt_${Date.now()}`,
      status: "created",
      created_at: Math.floor(Date.now() / 1000),
    };

    console.log("✅ Mock order created:", mockOrder);
    res.json(mockOrder);

  } catch (error) {
    console.error("❌ Mock order error:", error);
    res.status(500).json({ error: "Mock order failed" });
  }
};
