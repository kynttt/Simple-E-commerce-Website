import { Form, Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AddProduct() {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    
    const[name, setName] = useState("");
    const[description, setDescription] = useState("");
    const[price, setPrice] = useState(0);
    const [isActive, setIsActive] = useState(true);
 
    function addProduct(e) {

        e.preventDefault();
        
        fetch(`${process.env.REACT_APP_API_URL}/products/`, {
            method: "POST",
            headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if (data) {
                Swal.fire({
                    title: "Product added.",
                    icon: "success"
                })
                navigate("/products");
            } else {
                Swal.fire({
                    title: "Failed to add product.",
                    icon: "error"
                })
            }
            
        })
        setName("");
        setDescription("");
        setPrice(0);
    }
     
    useEffect(() => {
        if (
            (name !== "" &&
            description !== "" &&
            price !== "")
        ) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [name, description, price]);

    return (
        (user.isAdmin == false) ?
        <Navigate to ="/products" />
    :
    <div className="border p-4 col-lg-3 mx-auto rounded-2 mt-5" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
    <Form onSubmit={(e) => addProduct(e)} >
        <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
                type="text" 
                placeholder="Enter Name:" 
                required 
                value={name}
                onChange={e => {setName(e.target.value)}}
            />
        </Form.Group>
                    <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            as="textarea"  // Use 'as="textarea"' to create a textarea
                            rows={5}       // Set the number of visible rows (5 in this case)
                            placeholder="Enter Description:"
                            required
                            value={description}
                            onChange={e => { setDescription(e.target.value) }}
                        />
                    </Form.Group>
        <Form.Group>
            <Form.Label>Price:</Form.Label>
            <Form.Control 
                type="number" 
                placeholder="Enter Price:" 
                required 
                value={price}
                onChange={e => {setPrice(e.target.value)}}
            />
        </Form.Group>

        <div className='mt-3'>
        {isActive ?
            <Button variant="primary" type="submit" >Submit</Button>
            :
            <Button variant="danger" type="submit" >Submit</Button>
        }
        </div>
    </Form>
    </div>
    )
}