CREATE DATABASE IF NOT EXISTS payroll_system;
USE payroll_system;

CREATE TABLE IF NOT EXISTS Department (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Employee (
    emp_id INT PRIMARY KEY,
    name VARCHAR(100),
    designation VARCHAR(100),
    join_date DATE,
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES Department(dept_id)
);

CREATE TABLE IF NOT EXISTS Salary (
    salary_id INT PRIMARY KEY,
    emp_id INT UNIQUE,
    basic_salary DECIMAL(10,2),
    hra DECIMAL(10,2),
    bonus DECIMAL(10,2),
    deductions DECIMAL(10,2),
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id)
);

CREATE TABLE IF NOT EXISTS Attendance (
    att_id INT PRIMARY KEY,
    emp_id INT,
    working_days INT,
    leaves_taken INT,
    attendance_month VARCHAR(20) DEFAULT 'Current',
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id)
);

CREATE TABLE IF NOT EXISTS Payroll (
    payroll_id INT PRIMARY KEY,
    emp_id INT,
    net_salary DECIMAL(10,2),
    salary_month VARCHAR(20),
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id)
);

CREATE TABLE IF NOT EXISTS LeaveDetails (
    leave_id INT PRIMARY KEY,
    emp_id INT,
    leave_type VARCHAR(50),
    from_date DATE,
    to_date DATE,
    status VARCHAR(20) DEFAULT 'Pending',
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id)
);

CREATE TABLE IF NOT EXISTS Allowance (
    allowance_id INT PRIMARY KEY,
    emp_id INT,
    allowance_type VARCHAR(50),
    amount DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'Pending',
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id)
);

-- Seed Data --
INSERT IGNORE INTO Department VALUES (1, 'HR'), (2, 'IT'), (3, 'Finance');

INSERT IGNORE INTO Employee VALUES
(101, 'Ashish', 'Developer', '2023-06-01', 2),
(102, 'Rahul', 'Manager', '2022-03-15', 1),
(103, 'karthik', 'Developer', '2026-06-01', 2);

INSERT IGNORE INTO Salary VALUES
(1, 101, 30000, 5000, 2000, 1000),
(2, 102, 50000, 8000, 5000, 2000);

INSERT IGNORE INTO Attendance VALUES
(1, 101, 26, 2, 'March'),
(2, 102, 25, 1, 'March');

INSERT IGNORE INTO Payroll VALUES
(1, 101, 36000, 'March'),
(2, 102, 61000, 'March');

INSERT IGNORE INTO LeaveDetails VALUES
(1, 101, 'Sick', '2024-03-10', '2024-03-12', 'Pending'),
(2, 101, 'Casual', '2024-04-05', '2024-04-06', 'Pending'),
(3, 103, 'Sick', '2026-03-10', '2026-03-12', 'Pending');

INSERT IGNORE INTO Allowance VALUES
(1, 101, 'Travel', 1500, 'Pending'),
(2, 101, 'Food', 1000, 'Pending');
