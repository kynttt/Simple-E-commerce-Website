import React, { useEffect, useState } from 'react';

function MyOrders() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the user's orders when the component mounts
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const token = localStorage.getItem('token'); // Replace with your token retrieval method
      const response = await fetch('${process.env.REACT_APP_API_URL}/users/myOrders', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      setUser(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const renderOrders = () => {
    if (loading) {
      return <p>Loading orders...</p>;
    } else if (error) {
      return <p>Error: {error}</p>;
    } else if (user && user.orderedProduct) {
      if (user.orderedProduct.length === 0) {
        return <p>No orders found.</p>;
      } else {
        return (
          <ul>
            {user.orderedProduct.map((order, index) => (
              <li key={index}>
                <div>Order ID: {order._id}</div>
                {order.products.map((product, productIndex) => (
                  <div key={productIndex}>
                    <div>Product Name: {product.productName}</div>
                    <div>Quantity: {product.quantity}</div>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        );
      }
    }
  };

  return (
    <div>
      <h1>My Orders</h1>
      {renderOrders()}
    </div>
  );
}

export default MyOrders;
