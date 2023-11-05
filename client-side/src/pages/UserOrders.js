// import React, { useEffect, useState } from 'react';

// function UserOrders() {
//   const [products, setProducts] = useState([]);
//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const [userEmails, setUserEmails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch the list of products initially
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch('http://localhost:4002/products');
//       if (!response.ok) {
//         throw new Error(`Request failed with status: ${response.status}`);
//       }
//       const data = await response.json();
//       setProducts(data);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const fetchUserEmails = async (productId) => {
//     try {
//       const response = await fetch(`http://localhost:4002/products/${productId}/purchased-users`);
//       if (!response.ok) {
//         throw  Error(`Request failed with status: ${response.status}`);
//       }
//       const data = await response.json();
//       setUserEmails(data.userEmails);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const handleProductClick = (productId) => {
//     setSelectedProductId(productId);
//     fetchUserEmails(productId);
//   };

//   const renderProductList = () => {
//     if (loading) {
//       return <p>Loading products...</p>;
//     } else if (error) {
//       return <p>Error: {error}</p>;
//     } else if (products.length === 0) {
//       return <p>No products found.</p>;
//     } else {
//       return (
//         <ul className="list-group">
//           {products.map((product) => (
//             <li
//               key={product._id}
//               onClick={() => handleProductClick(product._id)}
//               className={`list-group-item ${
//                 selectedProductId === product._id ? 'active' : ''
//               }`}
//             >
            
//             {product.name}
              
//             </li>
//           ))}
//         </ul>
//       );
//     }
//   };

//   const renderUserEmails = () => {
//     if (loading) {
//       return <p>Loading user emails...</p>;
//     } else if (error) {
//       return <p>Error: {error}</p>;
//     } else if (userEmails.length === 0) {
//       return <p>No purchases yet.</p>;
//     } else {
//       return (
//         <table className="table table-hover">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Email</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userEmails.map((email, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{email}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       );
//     }
//   };

//   return (
//     <div className="row">
//       <div className="col-md-4">
//         <h2 className='bg-secondary text-white text-center'>Products</h2>
//         {renderProductList()}
//       </div>
//       <div className="col-md-8">
//         <h2 className='bg-secondary text-white text-center'>Users</h2>
//         {selectedProductId ? (
//           renderUserEmails()
//         ) : (
//           <p>Select a product to view user emails.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserOrders;


import React, { useEffect, useState } from 'react';

function UserOrders() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [userEmails, setUserEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of products initially
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchUserEmails = async (productId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/purchased-users`);
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      setUserEmails(data.userEmails);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    fetchUserEmails(productId);
  };

  const renderProductList = () => {
    if (loading) {
      return <p>Loading products...</p>;
    } else if (error) {
      return <p>Error: {error}</p>;
    } else if (products.length === 0) {
      return <p>No products found.</p>;
    } else {
      return (
        <ul className="list-group">
          {products.map((product) => (
            <li
              key={product._id}
              onClick={() => handleProductClick(product._id)}
              className={`list-group-item ${
                selectedProductId === product._id ? 'active' : ''
              }`}
            >
              {product.name}
            </li>
          ))}
        </ul>
      );
    }
  };

  const renderUserEmails = () => {
    if (loading) {
      return <p>Loading user emails...</p>;
    } else if (error) {
      return <p>Error: {error}</p>;
    } else if (userEmails.length === 0) {
      return <p>No purchases yet.</p>;
    } else {
      return (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {userEmails.map((email, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h2 className='bg-dark py-3 text-white text-center'>Products</h2>
        {renderProductList()}
      </div>
      <div className="col-md-6">
        <h2 className='bg-dark py-3 text-white text-center'>Users</h2>
        {selectedProductId ? (
          renderUserEmails()
        ) : (
          <p>Select a product to view user emails.</p>
        )}
      </div>
    </div>
  );
}

export default UserOrders;

