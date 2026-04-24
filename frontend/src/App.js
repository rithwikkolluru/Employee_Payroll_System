import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

// Employee
import EmployeeHome from "./pages/employee/EmployeeHome";
import SendLeave from "./pages/employee/SendLeave";
import SendRequest from "./pages/employee/SendRequest";
import SalaryStatus from "./pages/employee/SalaryStatus";

// Manager
import ManagerHome from "./pages/manager/ManagerHome";
import AddEmployee from "./pages/manager/AddEmployee";
import Attendance from "./pages/manager/Attendance";
import LeaveRequests from "./pages/manager/LeaveRequests";
import AllowanceRequests from "./pages/manager/AllowanceRequests";
import SalaryManager from "./pages/manager/SalaryManager";
import PayrollManager from "./pages/manager/PayrollManager";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* ================= EMPLOYEE ================= */}
        <Route path="/employee" element={<EmployeeHome />} />
        <Route path="/employee/leave" element={<SendLeave />} />
        <Route path="/employee/request" element={<SendRequest />} />
        <Route path="/employee/salary" element={<SalaryStatus />} />

        {/* ================= MANAGER ================= */}
        <Route path="/manager" element={<ManagerHome />} />
        <Route path="/manager/add-employee" element={<AddEmployee />} />
        <Route path="/manager/attendance" element={<Attendance />} />
        <Route path="/manager/leaves" element={<LeaveRequests />} />
        <Route path="/manager/allowance" element={<AllowanceRequests />} />
        <Route path="/manager/salary" element={<SalaryManager />} />
        <Route path="/manager/payroll" element={<PayrollManager />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;