import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // لو عايز الـ Sidebar يكون موجود برضه
import "../css/PMVFCSS.css";
function PMVFPage() {
  return (
    <div className="pmvf-page">
      <Sidebar /> 
      <div className="pmvf-content">
        <h2 className="pmvf-title">Weights Options</h2>
        <div className="buttons-container">
        <Link to="/lg4" className="pmvf-button lg4-button">
            LG4
          </Link>
          <Link to="/lg425" className="pmvf-button lg425-button">
            LG4.25
          </Link>
          <Link to="/sg4" className="pmvf-button sg4-button">
            SG4
          </Link>
          <Link to="/sg6" className="pmvf-button sg6-button">
            SG6
          </Link>
          
        </div>
      </div>
    </div>
  );
}

export default PMVFPage;