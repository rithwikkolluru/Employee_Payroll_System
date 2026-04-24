require("dotenv").config(); // optional if using .env

const app = require("./app");
const db = require("./config/db");

// PORT (use env or default)
const PORT = process.env.PORT || 5000;

// ✅ Check DB connection before starting server
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // stop server if DB fails
  }

  console.log("✅ MySQL Connected");

  // ✅ Start server only after DB is connected
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});


// ✅ Handle unexpected errors (best practice)
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err.message);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Promise Rejection:", err.message);
  process.exit(1);
});