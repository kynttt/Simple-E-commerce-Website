import React, { useState } from 'react';

import ProductCard from './ProductCard';

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productName: searchQuery })
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching for products:', error);
    }
  };

  return (
    <div className='col-lg-3 r ms-auto mt-3'>
      
      <div className="form-group ">
        {/* <label htmlFor="productName">Product Name:</label> */}
        <div className='d-flex flex-inline-block'>
        <input
          type="text"
          id="productName"
          className="form-control rounded-0"
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
        />
        
        <button className="btn btn-primary rounded-0" onClick={handleSearch}>
        Search
      </button>
      </div>
      </div>
      
      
      <ul className='ps-0'>
        {searchResults.map(product => (
          <>
            {/*<li key={product.id}>{product.name}</li>*/}
            <ProductCard productProp={product} key={product._id} />
          </>
        ))}
      </ul>
    </div>
  );
};

export default ProductSearch;
