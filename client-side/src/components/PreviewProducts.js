import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function PreviewProducts({data, breakPoint}){

    const { _id, name, description, price} = data;

	return(
		<Col xs={12} md={breakPoint} >
			<Card className="cardHighlight mx-2 shadow">
				<Card.Body >
					<Card.Title className="text-center">
						<Link to={`/products/${_id}`} className='text-decoration-none'>{name}</Link>
					</Card.Title>
					<Card.Text className='my-5'>{description}</Card.Text>
				</Card.Body>
				<Card.Footer>
					<h5 className="text-center">₱ {price}</h5>
					<Link to={`/products/${_id}`} className="btn btn-primary d-block">details</Link>
				</Card.Footer>
			</Card>
		</Col>

	)
}