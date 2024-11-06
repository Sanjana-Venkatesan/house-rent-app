import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/header';
import Home from './components/Home/home';
import SignIn from './components/SignIn/signin';
import HeroSection from './components/HerosectionDetails/hero';
import SignUp from './components/SignUp/signup';
import AdminDashboard from './components/AdminDash/admindashboard';
import OwnerDashboard from './components/OwnerDash/ownerdashboard';
import RenterDashboard from './components/RenterDash/renterdashboard'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          <Route path="/renter-dashboard" element={<RenterDashboard />} /> 


          <Route path="*" element={
            <>
              <Header />
              <Routes>
                <Route path="" element={
                  <>
                    <HeroSection />
                    <Home />
                  </>
                } />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp/>}/>
              </Routes>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;