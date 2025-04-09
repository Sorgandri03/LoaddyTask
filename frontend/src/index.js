import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";

localStorage.setItem("isAuthenticated", "")

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <div className="container mx-auto p-4">
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </div>
    </Router>
);