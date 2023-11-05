import { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import UserContext from '../UserContext';
import { useNavigate, Navigate } from 'react-router-dom';

import ResetPassword from '../components/ResetPassword';
import MyOrders from './MyOrders';


export default function Profile(){

	const { user } = useContext(UserContext);

	const [details, setDetails] = useState({});

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if(typeof data._id !== "undefined"){
				setDetails(data);
			}
		})

	}, []);

	return (
		(user.id === null) ?
			 <Navigate to="/products" />
		:
		<>
			<Row>
				<Col className="p-5 bg-primary text-white">
					<h1 className="my-5">Profile</h1>
					{/*<h2 className="mt-3">James Dela Cruz</h2>*/}
					{/* <h2 className="mt-3">{`${details.firstName} ${details.lastName}`}</h2> */}
					<hr />
					<h4>Contact</h4>
					<ul>
						{/*<li>Email: jamesDC@mail.com</li>*/}
						<li>Email: {details.email}</li>
						{/*<li>Mobile No: 09123456789</li>*/}
						{/* <li>Mobile No: {details.mobileNo}</li> */}
					</ul>
					
				</Col>
			</Row>
			{/* <Row className="pt-4 mt-4">
				<Col>
					<MyOrders />
					
				</Col>
			</Row> */}
			<Row className="pt-4 mt-4">
				<Col>
					<ResetPassword />
					
				</Col>
			</Row>
		</>

	)
}