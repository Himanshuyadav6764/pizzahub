const Razorpay = require("razorpay");
require('dotenv').config();

console.log("🔧 Testing Razorpay Credentials...");
console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID ? "✅ Loaded" : "❌ Missing");
console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET ? "✅ Loaded" : "❌ Missing");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function testRazorpay() {
  try {
    console.log("\n🧪 Creating test order...");
    
    const options = {
      amount: 100, // 1 rupee in paise
      currency: 'INR',
      receipt: `test_receipt_${Date.now()}`,
    };
    
    console.log("Test options:", options);
    
    const order = await razorpay.orders.create(options);
    console.log("✅ Success! Order created:", order);
    
  } catch (error) {
    console.error("❌ Test failed!");
    console.error("Error type:", typeof error);
    console.error("Error constructor:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Error statusCode:", error.statusCode);
    console.error("Error description:", error.description);
    console.error("Full error object:", error);
    
    // Check if it's a network error
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.error("\n🌐 This appears to be a network connectivity issue.");
      console.error("Please check your internet connection.");
    }
    
    // Check if it's an authentication error
    if (error.statusCode === 401 || error.statusCode === 403) {
      console.error("\n🔑 This appears to be an authentication issue.");
      console.error("Please verify your Razorpay test credentials.");
    }
  }
}

testRazorpay();
