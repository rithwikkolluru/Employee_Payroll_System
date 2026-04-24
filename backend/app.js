const express = require("express");
const cors = require("cors");
const logger = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/department", require("./routes/departmentRoutes"));
app.use("/employee", require("./routes/employeeRoutes"));
app.use("/salary", require("./routes/salaryRoutes"));
app.use("/attendance", require("./routes/attendanceRoutes"));
app.use("/payroll", require("./routes/payrollRoutes"));
app.use("/leave", require("./routes/leaveRoutes"));
app.use("/allowance", require("./routes/allowanceRoutes"));

module.exports = app;