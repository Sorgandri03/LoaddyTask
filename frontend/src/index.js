import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import CreateTeam from "./pages/CreateTeam";
import PrivateRoute from "./components/PrivateRoute";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <div className="container mx-auto p-4">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path='/teams' element={<PrivateRoute/>} />
                <Route path='/teams/:idteam' element={<PrivateRoute/>} />
                <Route path='/create-team' element={<PrivateRoute><CreateTeam /></PrivateRoute>} />
            </Routes>
        </div>
    </Router>
);