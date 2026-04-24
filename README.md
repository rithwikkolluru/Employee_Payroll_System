# Employee Management & Payroll System

A full-stack, comprehensive web application built with the **PERN stack (React, Node.js, Express, MySQL)** for managing employees, handling leave and allowance requests, tracking attendance, and generating dynamic payrolls.

## Features

### Role-Based Access Control
- **Manager Dashboard**: Full administrative privileges.
- **Employee Dashboard**: Self-service portal for employees.

### Employee Modules
- **Authentication**: Secure login using Employee ID and role validation.
- **Dashboard**: View personal details and access quick links.
- **Leave Requests**: Submit vacation, sick, or casual leave requests and track approval status.
- **Allowance Requests**: Submit reimbursement claims (e.g., Travel, Internet) and track approval status.
- **Salary & Payslips**: View generated monthly payslips and net salary breakdown.

### Manager Modules
- **Add Employees**: Easily onboard new employees with department and designation mapping.
- **Attendance Tracking**: Log monthly working days and leaves taken for each employee.
- **Leave & Allowance Approvals**: Review, approve, or reject employee requests with a single click.
- **Base Salary Management**: Define fixed base salaries, HRA, bonuses, and standard deductions.
- **Dynamic Payroll Generation**: Automatically calculate Net Salary for any given month. The system intelligently computes deductions based on the month's attendance records and adds approved allowances.

---

## Technology Stack
*   **Frontend**: React.js, CSS
*   **Backend**: Node.js, Express.js
*   **Database**: MySQL
*   **API Communication**: Axios, REST APIs

---

## Installation & Setup

### 1. Database Setup
1. Open MySQL Workbench or your preferred MySQL client.
2. Run the provided `database.sql` script to create the schema, tables, and insert initial seed data.
```sql
SOURCE /path/to/database.sql;
```

### 2. Backend Setup
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update `backend/config/db.js` with your local MySQL credentials.
   ```javascript
   const db = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "your_password", // Add your DB password here
     database: "payroll_system"
   });
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

---

## Key Design & Architecture Decisions

1. **Unique IDs**: Critical IDs (leave, allowance, attendance, salary) are dynamically generated to easily fit within MySQL INT limits safely.
2. **Dynamic Net Salary Engine**: The `PayrollController` intelligently cross-references a specific employee's base salary against their current month's attendance records (calculating per-day leave deductions) and dynamically adds the sum of all *Approved* allowances.
3. **Optimized SQL Schema**: Designed without restrictive `UNIQUE` constraints on historical tables (like Payroll and Attendance) to allow for infinite month-over-month tracking for every employee.

---

## Seed Data (For Testing)
*   **Manager**: `Employee ID: 102`
*   **Employee**: `Employee ID: 101`
