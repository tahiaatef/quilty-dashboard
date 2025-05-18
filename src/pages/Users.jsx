import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../css/users.css";
function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://18.197.69.165:5000/api/auth/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="app-layout">
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh", padding: "2rem" }}  className="content-area">
      <h1 style={{ color: "#37474f", textAlign: "center", marginBottom: "2rem", fontSize: "2rem", fontWeight: "bold", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", padding: "1rem" }}>
        Registered Users
      </h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1rem"
      }}>
        {users.map(user => (
          <div key={user._id} style={{
            backgroundColor: "#98C379",
            borderRadius: "10px",
            padding: "1rem",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            textAlign: "center"
          }}>
            <h3 style={{ color: "#ffffff" , marginBottom: "0.5rem", fontSize: "1.2rem", fontWeight: "bold"}}>{user.username}</h3>
            <p style={{ color: "#4A525A" }}><strong>Email:</strong> {user.email}</p>
            <p style={{ color: "#4A525A" }}><strong>Created At:</strong> <br /> {new Date(user.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
    <Sidebar />
    </div>
  );
}

export default Users;



