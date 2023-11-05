import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';


export default function Register() {

	const { user } = useContext(UserContext)
	const navigate = useNavigate(); // Create a navigate function;

	// State hooks to store the values of the input fields
	
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [verifyPassword, setVerifyPassword] = useState("");
	// State to determine whether submit button is enabled or not
	const [isActive, setIsActive] = useState(true);
	
	// Check if values are successfully binded
	console.log(email);
	console.log(password);
	console.log(verifyPassword);

	// Handler function for registering our user 
	function registerUser(e) {

		// Prevents page reload everytime we submit in the form
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);

			if(data){

				// To reset the form field after registration
				
				
				setEmail("");
				setPassword("");
				setVerifyPassword("");

				
				Swal.fire({
					title: "Thank you for registering",
					icon: "success",
					text: "Welcome to My E-commerce Shop!"
				})
				// Redirect to the login page after successful registration
				navigate("/login")
			} else {
				
				Swal.fire({
					title: "Registration failed",
					icon: "error",
					text: "Please try again later."
				})
			}
		})
	}



	// useEffect is used to create "side effects" or execute a codeblock everytime the component renders or if there are changes in the state that is listed in the dependecy array
	useEffect(() => {
		// Check if the fields are filled properly, checks if the password matches the confirm password, and checks if the length of mobileNo is 11.
		if(
			(
			
			email !== "" &&
			password !== "" &&
			verifyPassword !== "") &&
			(password === verifyPassword) 
			
		) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}

		// Dependency Array
	}, [ email, password, verifyPassword]);

	return (
		(user.id !== null) ?
		<Navigate to="/login"/>

		:
		<div className="border p-4 col-lg-3 mx-auto rounded-2 mt-5" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
		<Form  onSubmit={(e) => registerUser(e)} >
			
			<h1 className="my-5 text-center">Register</h1>
			<Form.Group>
				<Form.Label>Email:</Form.Label>
				<Form.Control 
					type="email" 
					placeholder="Enter your email" 
					required 
					value={email}
					onChange={e => {setEmail(e.target.value)}}
				/>
			</Form.Group>
			
			<Form.Group className='mt-3'>
				<Form.Label>Password:</Form.Label>
				<Form.Control 
					type="password" 
					placeholder="Enter your password." 
					required 
					value={password}
					onChange={e => {setPassword(e.target.value)}}
				/>
			</Form.Group>

			<Form.Group className='mt-3'>
				<Form.Label>Verify Password:</Form.Label>
				<Form.Control 
					type="password" 
					placeholder="Verify your password." 
					required 
					value={verifyPassword}
					onChange={e => {setVerifyPassword(e.target.value)}}
				/>
			</Form.Group>
			

			{/* conditionally render submit button based on isActive state */}
			<hr className="mt-5" style={{ borderTop: '1px solid black' }} />
			<div className="text-center">
			{ isActive ?
				<Button className='mt-2 col-12 mx-auto rounded-0' variant="primary" type="submit" >Submit</Button>
				:
				<Button className='mt-2 col-12 mx-auto rounded-0' variant="danger" type="submit" disabled >Please enter your registration details</Button>

			}
			</div>
		</Form>
		</div>

	)
}