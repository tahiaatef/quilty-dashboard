import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // لو عايز الـ Sidebar يكون موجود برضه
import "../css/packagingCSS.css";
function PackagingPage() {
  return (
    <div className="packaging-page">
      <Sidebar /> 
      <div className="packaging-content">
        <h2 className="packaging-title">Packaging Options</h2>
        <div className="buttons-container">
        <Link to="/pmvf" className="packaging-button lg4-button">
            Weights
          </Link>
          <Link to="/rejectionweight" className="packaging-button lg425-button">
            Rejection Weights
          </Link>
          
        </div>
      </div>
    </div>
  );
}

export default PackagingPage;