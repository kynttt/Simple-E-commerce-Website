import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductSearch from './ProductSearch';
import FeaturedProducts from './FeaturedProducts';
import { Row, Col, Container } from 'react-bootstrap';

export default function UserView({ productsData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsArr = productsData.map((product) => {
      if (product.isActive === true) {
        return (
          <Col key={product._id} xs={12} sm={6} md={4} lg={4} className="mb-4">
            <div className="shadow p-3">
              <ProductCard productProp={product} />
            </div>
          </Col>
        );
      } else {
        return null;
      }
    });

    setProducts(productsArr);
  }, [productsData]);

  return (
    <>
      <ProductSearch/>
      <Container className='mt-5'>
        <Row>{products}</Row>
      </Container>
    </>
  );
}
