const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Pizza = require("./models/Pizza.js");
const User = require("./models/User.js");
const { Base, Cheese, Veggies, Sauce, Meat } = require("./models/Inventory.js");
const bcrypt = require("bcryptjs");

dotenv.config();

// Sample Inventory Data
const bases = [
  { name: "Thin Crust", quantity: 50, price: 100 },
  { name: "Thick Crust", quantity: 50, price: 120 },
  { name: "Cheese Burst", quantity: 30, price: 150 },
  { name: "Wheat Base", quantity: 40, price: 110 },
  { name: "Gluten Free", quantity: 20, price: 180 }
];

const sauces = [
  { name: "Tomato Basil", quantity: 100 },
  { name: "Pesto", quantity: 80 },
  { name: "BBQ", quantity: 90 },
  { name: "White Garlic", quantity: 70 },
  { name: "Marinara", quantity: 85 }
];

const cheeses = [
  { name: "Mozzarella", quantity: 200 },
  { name: "Cheddar", quantity: 150 },
  { name: "Parmesan", quantity: 100 },
  { name: "Feta", quantity: 80 },
  { name: "Gouda", quantity: 90 }
];

const meats = [
  { name: "Chicken", quantity: 100 },
  { name: "Beef", quantity: 80 },
  { name: "Pepperoni", quantity: 120 },
  { name: "Chicken Tikka", quantity: 90 },
  { name: "Ham", quantity: 70 }
];

const veggies = [
  { name: "Onion", quantity: 200 },
  { name: "Capsicum", quantity: 180 },
  { name: "Mushroom", quantity: 150 },
  { name: "Olives", quantity: 100 },
  { name: "Corn", quantity: 160 },
  { name: "Jalapenos", quantity: 120 },
  { name: "Paneer", quantity: 140 },
  { name: "Bell Peppers", quantity: 130 },
  { name: "Tomato", quantity: 170 }
];

// Sample Pizza Data
const pizzas = [
  {
    base: "Small",
    sauce: "Tomato Basil",
    cheese: "Mozzarella",
    meat: "Chicken",
    veggies: ["Onion", "Capsicum"],
    price: 5,
  },
  {
    base: "Medium",
    sauce: "Pesto",
    cheese: "Cheddar",
    meat: "Beef",
    veggies: ["Mushroom", "Olives"],
    price: 8,
  },
  {
    base: "Large",
    sauce: "BBQ",
    cheese: "Mozzarella",
    meat: "Pepperoni",
    veggies: ["Corn", "Jalapenos"],
    price: 12,
  },
  {
    base: "Premium",
    sauce: "White Garlic",
    cheese: "Parmesan",
    meat: "Chicken Tikka",
    veggies: ["Paneer", "Bell Peppers"],
    price: 15,
  },
  {
    base: "Classic",
    sauce: "Tomato",
    cheese: "Mozzarella",
    meat: "Veg",
    veggies: ["Tomato", "Onion", "Capsicum"],
    price: 7,
  },
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Clear existing data
    await Pizza.deleteMany();
    await User.deleteMany();
    await Base.deleteMany();
    await Sauce.deleteMany();
    await Cheese.deleteMany();
    await Meat.deleteMany();
    await Veggies.deleteMany();
    
    // Create inventory data
    await Base.insertMany(bases);
    await Sauce.insertMany(sauces);
    await Cheese.insertMany(cheeses);
    await Meat.insertMany(meats);
    await Veggies.insertMany(veggies);
    
    // Create a test user first
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);
    
    const testUser = await User.create({
      name: "Test User",
      email: "test@pizzahub.com",
      password: hashedPassword,
      isAdmin: false
    });
    
    // Update pizzas data with user ID
    const pizzasWithUser = pizzas.map(pizza => ({
      ...pizza,
      user: testUser._id
    }));

    await Pizza.insertMany(pizzasWithUser);

    console.log("✅ Inventory Data Created!");
    console.log("✅ Test User Created!");
    console.log("✅ Pizza Data Imported!");
    console.log("🔑 Test Login: test@pizzahub.com / password123");
    process.exit();
  } catch (error) {
    console.error("❌ Error importing data:", error);
    process.exit(1);
  }
};

importData();
