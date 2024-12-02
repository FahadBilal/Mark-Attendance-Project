import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider, useDispatch } from "react-redux";
import { store, persistor } from "./app/store.js";
import { createSession } from "./app/authSlice.js";
import ToasterMessage from "./global/Toaster.jsx";
import Home from "./HomePage/index.jsx";
import Register from "./SignUpPage";
import Login from "./LoginPage/Index.jsx";
import AdminPage from "./adminPage/index.jsx";
import UserPage from "./UserPage/index.jsx";
import AuthLayout from "./global/AuthLayout.jsx";
import "./App.css";
import "./css/satoshi.css";

const MainApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createSession());
  }, [dispatch]);

  return (
    <Router>
      <ToasterMessage />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={
          <AuthLayout authentication={false}>
            <Register/>
          </AuthLayout>
        } />
        <Route path="/login" element={
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        } />
        <Route path="/student" element={
          <AuthLayout authentication>
            <UserPage/>
          </AuthLayout>
        } />
        <Route path="/admin" element={
          <AuthLayout authentication>
            <AdminPage/>
          </AuthLayout>
        } />
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
