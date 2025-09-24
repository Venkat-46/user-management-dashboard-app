import React, { useState } from "react";
import api from "../Services/api";
import "./index.css";

const AddUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ show: false, success: false, message: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ show: false, success: false, message: "" });

    try {
      const res = await  api.createUser(formData);
      setStatus({ show: true, success: true, message: "User added successfully!" });
      setFormData({ firstName: "", lastName: "", email: "", department: "" });
    } catch (error) {
      console.error("Error adding user:", error);
      setStatus({ show: true, success: false, message: "Failed to add user!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-user-container">
      <h2>Add User</h2>
      <form className="add-user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            required
            value={formData.department}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Add User"}
        </button>
      </form>

      {/* Status Popup */}
      {status.show && (
        <div className={`status-popup ${status.success ? "success" : "error"}`}>
          {status.message}
          <button onClick={() => setStatus({ show: false })}>X</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
