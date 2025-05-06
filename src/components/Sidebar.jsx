
import React from 'react';
import { Link } from 'react-router-dom';
import "../css/Sidebar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faClock, faExclamationTriangle, faRecycle, faSlidersH, faCogs } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  return (
    <div className="button-sidebar">
      <div className="sidebar-header">
        <h3 className="sidebar-title">Dashboard Menu</h3>
      </div>
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <Link to="/" className="sidebar-button">
            <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
            <span>Overview</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/users" className="sidebar-button">
            <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
            <span>Users</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/shifts" className="sidebar-button">
            <FontAwesomeIcon icon={faClock} className="sidebar-icon" />
            <span>Shifts</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/msa" className="sidebar-button">
            <FontAwesomeIcon icon={faSlidersH} className="sidebar-icon" />
            <span>MSA</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/ncr" className="sidebar-button">
            <FontAwesomeIcon icon={faExclamationTriangle} className="sidebar-icon" />
            <span>NCR</span>
          </Link>
        </li>
        
        <li className="sidebar-item">
          <Link to="/pmvf" className="sidebar-button">
            <FontAwesomeIcon icon={faCogs} className="sidebar-icon" />
            <span>PMVF Options</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/regrind" className="sidebar-button">
            <FontAwesomeIcon icon={faRecycle} className="sidebar-icon" />
            <span>Regrind</span>
          </Link>
        </li>
      
      </ul>
      <div className="sidebar-footer">
        <p className="footer-text">&copy; 2025 Management System</p>
      </div>
    </div>
  );
}

export default Sidebar;