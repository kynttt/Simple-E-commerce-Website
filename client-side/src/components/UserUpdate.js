import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    mobileNo: '',
  });
  const [token, setToken] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Profile updated successfully
        alert('Profile updated successfully');
      } else {
        // Handle error response
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // This useEffect can be used to load the user's existing profile data
  useEffect(() => {
    // Fetch user's profile data using the token
    // Update the state with the fetched data
  }, [token]);

  return (
    <div>
      <h2>Update Profile</h2>
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className="form-control"
          value={userData.firstName}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          className="form-control"
          value={userData.lastName}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="mobileNo">Mobile Number</label>
        <input
          type="tel"
          id="mobileNo"
          name="mobileNo"
          className="form-control"
          value={userData.mobileNo}
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpdateProfile}>
        Update Profile
      </button>
    </div>
  );
};

export default UserProfile;
