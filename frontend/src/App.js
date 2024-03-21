import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Landing from "./Pages/Landing/Landing";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Home from "./Pages/Home/Home";
import Admin from "./Pages/Admin/Admin";
import StudentDetail from "./Pages/Admin/StudentDetail";

const App = () => {
  return (
    <>
    <Router>
      <>
        <Navbar />

        <ToastContainer />
        <Routes>
          <Route path="/" element={<Landing />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/studentdetail" element={<StudentDetail />} />
          {/* PRIVATE ROUTES BELOW THIS */}
          {/* <Route path="/" element={<Private />}>
            <Route path="/editcustomer" element={<CustomerEdiit />} />
          </Route> */}

          
        </Routes>
     </>
    </Router>
  </>
  )
}

export default App