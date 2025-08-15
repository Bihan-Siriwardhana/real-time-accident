// src/router/AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ReportAccident from "../pages/Accidents";
import AccidentDetails from "../pages/AccidentDetails";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import HomePage from "../components/HomePage";
import AddAccident from "../pages/AddAccident";
import AccidentEditPage from "../components/EditAccident";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/report" element={<ReportAccident />} />
      <Route path="/accident/:id" element={<AccidentDetails />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/addaccident" element={<AddAccident />} />
      <Route path="/editaccident/:id" element={<AccidentEditPage />} />
    </Routes>
  );
};

export default AppRouter;
