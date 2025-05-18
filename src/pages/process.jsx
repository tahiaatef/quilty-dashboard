import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // لو عايز الـ Sidebar يكون موجود برضه
import "../css/packagingCSS.css";
function ProcessPage() {
  return (
    <div className="packaging-page">
      <Sidebar /> 
      <div className="packaging-content">
        <h2 className="packaging-title">Packaging Options</h2>
        <div className="buttons-container">
        <Link to="/msa" className="packaging-button lg4-button">
            MSA
          </Link>
          <Link to="/visualcheck" className="packaging-button lg425-button">
            Visual Check
          </Link>
          <Link to="/regrind" className="packaging-button sg4-button">
            Regrind
          </Link>
          
        </div>
      </div>
    </div>
  );
}

export default ProcessPage;