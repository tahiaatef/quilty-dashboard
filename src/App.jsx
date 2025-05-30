import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Shifts from './pages/Shifts';
import MSA from './pages/MSA';
import NCR from './pages/NCR';
import RegrindPage from './pages/Regrind';
import LG4 from './pages/LG4';
import Lg4_25Dashboard from './pages/LG425';
import SG4 from './pages/SG4';
import SG6 from './pages/SG6';
import PMVFPage from './pages/PMVFPage';
import PackagingPage from './pages/packaging';
import Rejection1Page from './pages/reject1';
import Rejection2Page from './pages/reject2';
import RejectionPage from './pages/rejectionweight';
import ProcessPage from './pages/process';
import Visualcheck from './pages/visualcheck';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/shifts" element={<Shifts />} />
        <Route path="/ncr" element={<NCR />} />
        <Route path="/msa" element={<MSA />} />
        <Route path="/regrind" element={<RegrindPage/>} />
        <Route path="/packaging" element={<PackagingPage />} />
        <Route path="/rejectionweight" element={<RejectionPage />} />
        <Route path="/rejectionweight1" element={<Rejection1Page />} />
        <Route path="/rejectionweight2" element={<Rejection2Page />} />
        <Route path="/visualcheck" element={<Visualcheck />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/pmvf" element={<PMVFPage />} />
        <Route path="/lg4" element={<LG4 />} />
        <Route path="/lg425" element={<Lg4_25Dashboard />} />
        <Route path="/sg4" element={<SG4/>} />
        <Route path="/sg6" element={<SG6/>} />
      </Routes>
    </Router>
  );
};

export default App;

