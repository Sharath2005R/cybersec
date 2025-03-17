import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RequireAuth } from './components/RequireAuth';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Geturl } from './pages/Getquery';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Signup } from './pages/signup';
import  Dashboard  from './pages/Dashboard'
import Phishing from './pages/Phishing';
import VulnerabilityCatalog from './pages/VulnerabilityCatalog';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> 
            <Route path="/Geturl/:id" element={<Geturl />} /> 
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/vulnerability" element={<VulnerabilityCatalog/>}/>
            <Route path="/phishing" element={<Phishing/>}/>
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;