import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import necessary components
import Home from './components/Home'; // Correctly import Home component
import Login from './components/Login'; // Import Login component
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Correct the route for Home component */}
        <Route path="/login" element={<Login />} /> {/* Route for Login component */}
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        
      </Routes>
    </Router>
  );
}

export default App;
