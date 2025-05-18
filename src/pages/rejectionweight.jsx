import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // لو عايز الـ Sidebar يكون موجود برضه
import "../css/RejectionPageCSS.css";
function RejectionPage() {
  return (
    <div className="packaging-page">
      <Sidebar /> 
      <div className="packaging-content">
        <h2 className="packaging-title"> Rejection Weight Options</h2>
        <div className="buttons-container">
        <Link to="/rejectionweight1" className="packaging-button lg4-button">
            LG4 & LG4.25
          </Link>
          <Link to="/rejectionweight2" className="packaging-button lg425-button">
            SG4 & SG6
          </Link>
          
        </div>
      </div>
    </div>
  );
}

export default RejectionPage;