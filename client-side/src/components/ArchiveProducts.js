import {Button} from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ArchiveProduct({product, isActive, fetchData}){

	const archiveToggle = (productId) => {
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archive`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {

			if(data === true){
				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Product successfully disabled"
				})
				fetchData();
			} else {
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please Try Again"
				})
				fetchData()
			}

		})
	}

	const activateToggle = (productId) => {
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/activate`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {

			if(data === true){
				Swal.fire({
					title: "Success",
					icon: "success",
					text: "Product successfully enabled"
				})
				fetchData();
			} else {
				Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please Try Again"
				})
				fetchData()
			}

		})
	}

	return (
		<>
			{isActive ?
				<Button className='rounded-0' style={{ width: '80px' }} variant="danger" size="sm" onClick={() => archiveToggle(product)} >Archive</Button>
			:
				<Button className='rounded-0' style={{ width: '80px' }} variant="success" size="sm" onClick={() => activateToggle(product)} >Activate</Button>
			}
		</>

	)
}