import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

import MenuItem from "../models/MenuItem.js";
import Order from "../models/Order.js";
import connectDB from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env explicitly
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("🚀 Seed script started");

const menuItems = [
  // Appetizers
  {
    name: "Veg Manchurian",
    description: "Crispy vegetable balls tossed in sauce",
    category: "Appetizer",
    price: 150,
    ingredients: ["Cabbage", "Carrot", "Spices"],
    isAvailable: true
  },
  {
    name: "Paneer Tikka",
    description: "Grilled paneer with spices",
    category: "Appetizer",
    price: 200,
    ingredients: ["Paneer", "Yogurt", "Spices"],
    isAvailable: true
  },

  // Main Course
  {
    name: "Paneer Butter Masala",
    description: "Creamy tomato gravy with paneer",
    category: "Main Course",
    price: 220,
    ingredients: ["Paneer", "Butter", "Tomato"],
    isAvailable: true
  },
  {
    name: "Veg Biryani",
    description: "Aromatic rice with vegetables",
    category: "Main Course",
    price: 180,
    ingredients: ["Rice", "Vegetables"],
    isAvailable: true
  },
  {
    name: "Dal Tadka",
    description: "Yellow dal tempered with spices",
    category: "Main Course",
    price: 160,
    ingredients: ["Lentils", "Spices"],
    isAvailable: true
  },

  // Desserts
  {
    name: "Gulab Jamun",
    description: "Milk-solid dumplings in sugar syrup",
    category: "Dessert",
    price: 90,
    ingredients: ["Milk solids", "Sugar"],
    isAvailable: true
  },
  {
    name: "Ice Cream",
    description: "Vanilla ice cream scoop",
    category: "Dessert",
    price: 80,
    ingredients: ["Milk", "Sugar"],
    isAvailable: true
  },

  // Beverages
  {
    name: "Masala Chai",
    description: "Indian spiced tea",
    category: "Beverage",
    price: 40,
    ingredients: ["Tea", "Milk", "Spices"],
    isAvailable: true
  },
  {
    name: "Cold Coffee",
    description: "Chilled coffee with milk",
    category: "Beverage",
    price: 90,
    ingredients: ["Coffee", "Milk"],
    isAvailable: true
  }
];


const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("🗑️  Clearing existing data...");
    await MenuItem.deleteMany({});
    await Order.deleteMany({});
    console.log("✅ Existing data cleared");

    console.log("📝 Inserting menu items...");
    const createdMenuItems = await MenuItem.insertMany(menuItems);
    console.log(`✅ ${createdMenuItems.length} menu items created`);

    console.log("📝 Creating sample orders...");

const createdOrders = [];
const statuses = ["Pending", "Preparing", "Ready", "Delivered", "Cancelled"];

for (let i = 0; i < 10; i++) {
  // Pick 1–3 random menu items
  const itemsCount = Math.floor(Math.random() * 3) + 1;
  const items = [];
  let totalAmount = 0;

  for (let j = 0; j < itemsCount; j++) {
    const menuItem =
      createdMenuItems[Math.floor(Math.random() * createdMenuItems.length)];

    const quantity = Math.floor(Math.random() * 3) + 1;
    const price = menuItem.price;

    totalAmount += price * quantity;

    items.push({
      menuItem: menuItem._id,
      quantity,
      price
    });
  }

  const order = await Order.create({
    orderNumber: `ORD-${String(i + 1).padStart(3, "0")}`,
    items,
    totalAmount,
    customerName: `Customer ${i + 1}`,
    tableNumber: i + 1,
    status: statuses[i % statuses.length]
  });

  createdOrders.push(order);
}

    console.log(`✅ ${createdOrders.length} orders created`);

    console.log("🎉 Database seeded successfully!");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
};

// ✅ THIS WAS MISSING / NOT RUNNING BEFORE
seedDatabase();
