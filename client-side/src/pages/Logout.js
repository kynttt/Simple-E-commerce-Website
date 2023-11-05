import { Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import UserContext from '../UserContext';

export default function Logout() {

	// Clear our local storage
	// localStorage.clear();
	const { unsetUser, setUser } = useContext(UserContext);

	//Clear the local storage using the unsetUser() function from the global state
	unsetUser();

	// By adding the useEffect, this will allow the Logout page to render first before triggering the useEffect which chages the value of the "user" state.
	useEffect(() => {
		// Set the user state back to it's original value
		setUser({
			id: null,
			isAdmin: null
		});
	}, [])

	// Redirect back to login
	return (

		<Navigate to='/login' />
	)
}