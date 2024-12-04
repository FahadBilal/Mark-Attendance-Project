import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider, useDispatch } from "react-redux";
import { store, persistor } from "./app/store.js";
import ToasterMessage from "./global/Toaster.jsx";
import Home from "./HomePage/index.jsx";
import Register from "./SignUpPage";
import Login from "./LoginPage/Index.jsx";
import AdminPage from "./adminPage/index.jsx";
import UserPage from "./UserPage/index.jsx";
import ProtectedRoute from './global/AuthLayout.jsx'
import LeaveRequest from "./UserPage/LeaveRequest.jsx";
import AttendanceRecord from "./UserPage/AttendanceRecord.jsx";
import ChangedPassword from "./UserPage/ChangedPassword.jsx";
import "./App.css";
import "./css/satoshi.css";

const MainApp = () => {
 ;

  return (
    <Router>
      <ToasterMessage />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={<Register/>}
        />
        <Route
          path="/login"
          element={<Login/>}
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/leaveRequest"
          element={
            <ProtectedRoute role="student">
              <LeaveRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/attendanceRecord"
          element={
            <ProtectedRoute role="student">
              <AttendanceRecord />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/changePassword"
          element={
            <ProtectedRoute role="student">
              <ChangedPassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
}

export default App;
