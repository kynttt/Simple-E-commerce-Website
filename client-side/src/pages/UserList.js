import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchAuthenticatedUsers(token);
    } else {
      setLoading(false);
      setError('Authentication token not found');
    }
  }, []);

  const fetchAuthenticatedUsers = async (token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/authenticated`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const makeAdmin = (userId) => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/setAsAdmin`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            // You can refresh the user list after a successful update
            fetchAuthenticatedUsers(token);
            // Show success alert
            Swal.fire({
              title: 'Success',
              text: 'User is now an admin',
              icon: 'success',
            });
          } else {
            throw new Error('Failed to make user admin');
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  const makeRegularUser = (userId) => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/setAsRegularUser`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            // You can refresh the user list after a successful update
            fetchAuthenticatedUsers(token);
            // Show success alert
            Swal.fire({
              title: 'Success',
              text: 'An Admin is now a Regular User',
              icon: 'success',
            });
          } else {
            throw new Error('Failed to make user a regular user');
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 bg-dark text-white py-3 text-center">User List</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-danger">Error: {error}</p>
      ) : users.length === 0 ? (
        <p>No authenticated users found.</p>
      ) : (
        <ul className="list-group shadow">
          {users.map((user) => (
            <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
              <span className="col-8">{user.email}</span>
              <div className="col-4 text-right text-center">
                {user.isAdmin ? (
                  <button onClick={() => makeRegularUser(user._id)} className="btn btn-warning btn-sm ">
                    Make Regular User
                  </button>
                ) : (
                  <button onClick={() => makeAdmin(user._id)} className="btn btn-primary btn-sm ">
                    Make Admin
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
