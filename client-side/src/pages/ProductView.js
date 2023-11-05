import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function ProductView() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1); // Initialize quantity to 1

  // Checkout user
  const checkout = (productId) => {
    if (user.isAdmin) {
      Swal.fire({
        title: 'Admin Not Allowed',
        icon: 'info',
        text: 'Admin users are not allowed to check out products.',
      });
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/users/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          productId: productId,
          quantity: quantity, // Include the quantity in the request
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (data.message === 'Checked-out Successfully.') {
            Swal.fire({
              title: 'Successfully',
              icon: 'success',
              text: 'You have successfully purchased this product.',
            });

            navigate('/products');
          } else {
            Swal.fire({
              title: 'Something went wrong',
              icon: 'error',
              text: 'Please try again.',
            });
          }
        });
    }
  };

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Decrease quantity (prevent going below 1)
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Retrieve product details
  useEffect(() => {
    console.log(productId);

    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
      });
  }, [productId]);

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body className="shadow p-3">
              <Card.Title className="text-center text-white bg-dark py-2">{name}</Card.Title>
              <Card.Text className="my-5">{description}</Card.Text>
              <Card.Text className="text-warning">₱ {price}</Card.Text>
              <Card.Subtitle>Quantity</Card.Subtitle>
              <div className="d-flex justify-content-between align-items-center">
				<div className='border mt-2'>
                <Button onClick={decreaseQuantity} variant="dark" className='rounded-0'>
                  -
                </Button>
                <span className='mx-5'>{quantity}</span>
                <Button onClick={increaseQuantity} variant="dark" className='rounded-0'>
                  +
                </Button>
				</div>
              </div>
              <hr />
              {user.id !== null ? (
                <Button className="btn btn-primary col-12 rounded-0" block onClick={() => checkout(productId)}>
                  Checkout
                </Button>
              ) : (
                <Link className="btn btn-danger btn-block" to="/login">
                  Log in to Purchase
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
