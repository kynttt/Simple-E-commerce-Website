// ----------AdminView.js----------
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import EditProduct from './EditProduct';
import ArchiveProducts from './ArchiveProducts';
import { Link } from 'react-router-dom';
import UpdateUserToAdmin from './UpdateUserToAdmin';

 
export default function AdminView({ productsData, fetchData }) {

	const [products, setProducts] = useState([]);


	useEffect(() => {
		const productArr = productsData.map(product => {
			return (
				<tr>
					
					<td className="text-center align-middle">{product.name}</td>
					<td className="text-center align-middle">{product.description}</td>
					<td className="text-center align-middle">{product.price}</td>
					<td className={product.isActive ? "text-success text-center align-middle" : "text-danger text-center align-middle"}>{product.isActive ? "Available" : "Unavailable"}</td>
					<td className='text-center align-middle'>
						<>
						<div className='my-1'>
						<EditProduct  product={product._id} fetchData={fetchData} /><br/>
						</div>
						<div className='my-1'>
						<ArchiveProducts product={product._id} fetchData={fetchData} isActive={product.isActive} />
						</div>
						</>
					</td>
				</tr>

			)
		})

		setProducts(productArr);

	}, [productsData])

	return (
		<>
			<h1 className="text-center my-4 bg-dark text-white py-3">Admin Dashboard</h1>

			<div className='text-center mt-3 mb-4'>
				<span className='mx-1'>
					<Link to="/addProduct" className="btn btn-primary">Add New Product</Link>
				</span>
				<span className='mx-1'>
					<Link to="/userOrders" className="btn btn-primary ">Show User Orders</Link>
				</span>

				<span className='mx-1'>
					<Link to="/userList" className="btn btn-primary ">Show Users</Link>
				</span>
			</div>

			<Table striped bordered hover responsive>
				<thead >
					<tr className="text-center ">
						
						<th className='bg-secondary text-white'>Name</th>
						<th className='bg-secondary text-white'>Description</th>
						<th className='bg-secondary text-white'>Price</th>
						<th className='bg-secondary text-white'>Availability</th>
						<th className='bg-secondary text-white'>Actions</th>
					</tr>
				</thead>
				<tbody>
					{products}
				</tbody>
			</Table>
			{/* <UserList/> */}

			
		</>
	)
}