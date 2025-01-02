// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import LoginPage from './components/LoginPage';
// import RegisterPage from './components/registerpage';
// import AdminDashboard from './components/admindashboard';
// import StudentDashboard from './components/Student Dashboard';
// import ExamPage from './components/exampage';

// function App() {

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/registerpage";
import AdminDashboard from "./components/admindashboard"
import StudentDashboard from "./components/Student Dashboard";
import ExamPage from "./components/exampage";

function App() {
  return (
    <Router>
      <Routes> {/* Use Routes instead of Switch */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/exam/:id" element={<ExamPage />} />
      </Routes>
    </Router>
  );
}

export default App;

