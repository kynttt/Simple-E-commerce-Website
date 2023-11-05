import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function UpdateUserToAdmin() {
  const [userId, setUserId] = useState('');
  const [updateStatus, setUpdateStatus] = useState(null);

  const handleUpdateAdmin = () => {
    // Make a request to your backend to update the user to an admin
    fetch(`${process.env.REACT_APP_API_URL}/users/userToAdmin`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setUpdateStatus('User has been updated to admin successfully.');
        } else {
          setUpdateStatus('Failed to update user to admin.');
        }
      })
      .catch((error) => {
        setUpdateStatus('An error occurred while updating user to admin.');
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Update User to Admin</h2>
      <Form>
        <Form.Group>
          <Form.Label>User ID:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleUpdateAdmin}>
          Update to Admin
        </Button>
      </Form>

      {updateStatus && <p>{updateStatus}</p>}
    </div>
  );
}
