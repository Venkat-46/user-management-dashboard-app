import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../Services/api";
import "./index.css";

const searchFilters = ["firstName", "lastName", "email", "department"];

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Search & Filters
  const [searchField, setSearchField] = useState("firstName");
  const [searchTerm, setSearchTerm] = useState("");

  // Sorting
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchUsers();
  }, [currentPage, limit, sortField, sortOrder]);

  const fetchUsers = async () => {
    try {
      const params = {
        page: currentPage,
        limit,
        sortField,
        sortOrder,
      };

      // Add search value to the selected field only
      if (searchTerm) {
        params[searchField] = searchTerm;
      }

      const res = await api.getUsers(params);
      const usersData = res.data.users.map((user) => ({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        department: user.department,
      }));
      setUsers(usersData);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.deleteUser(id);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleSort = (field) => {
  if (sortField === field) {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  } else {
    setSortField(field);
    setSortOrder("asc");
  }
};


  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="users-container">
      <h2>User List</h2>

      {/* Search Controls */}
      <div className="controls">
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        >
          {searchFilters.map((filter) => (
            <option key={filter} value={filter}>
              {filter.toUpperCase()}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchField}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-btn" onClick={()=>(fetchUsers())}>Search</button>
      </div>

      {/* Sorting Controls */}
      <div className="sort-controls">
        <button onClick={() => handleSort("firstName")}>Sort by First Name</button>
        <button onClick={() => handleSort("lastName")}>Sort by Last Name</button>
        <button onClick={() => handleSort("email")}>Sort by Email</button>
        <button onClick={() => handleSort("department")}>Sort by Department</button>
      </div>

      {/* Users Grid */}
      <div className="users-grid">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="user-card">
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Department:</strong> {user.department}</p>
              <div className="card-actions">
                <Link to={`/edit-user/${user.id}`} className="edit-btn">Edit</Link>
                <button className="delete-btn" onClick={() => deleteUser(user.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <label>
          Show:
          <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </label>
        <div className="page-buttons">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
