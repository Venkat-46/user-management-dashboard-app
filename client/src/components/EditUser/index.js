import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../Services/api";
import "./index.css";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ show: false, success: false, message: "" });

  // Fetch user details on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.getUserById(id);
        const user = res.data;
        setFormData({
          firstName: user.first_name || "",
          lastName: user.last_name || "",
          email: user.email || "",
          department: user.department || "",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
        setStatus({ show: true, success: false, message: "Failed to load user!" });
      }
    };
    fetchUser();
  }, [id]);

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
      await api.updateUser(id, formData);
      setStatus({ show: true, success: true, message: "User updated successfully!" });
      setTimeout(() => navigate("/"), 1500); // redirect after success
    } catch (error) {
      console.error("Error updating user:", error);
      setStatus({ show: true, success: false, message: "Failed to update user!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-user-container">
      <h2>Edit User</h2>
      <form className="edit-user-form" onSubmit={handleSubmit}>
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
          {loading ? "Saving..." : "Save Changes"}
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

export default EditUser;
