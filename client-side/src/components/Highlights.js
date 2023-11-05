import { Row, Col, Card } from 'react-bootstrap';

export default function Highlights() {

	return (
		 <Row className="mt-3 mb-3  ">
		    <Col xs={12} md={4}>
		        <Card className="cardHighlight p-3 ">
		            <Card.Body>
		                <Card.Title>
		                    <h2 className='text-center'>Discover Our Top Features</h2>
		                </Card.Title>
		                <Card.Text>
						Explore the remarkable features that set our product apart. Each feature is designed with you in mind, offering an exceptional user experience.
		                </Card.Text>
		            </Card.Body>
		        </Card>
		    </Col>
		    <Col xs={12} md={4}>
		        <Card className="cardHighlight p-3">
		            <Card.Body>
		                <Card.Title>
		                    <h2 className='text-center'>What Our Customers Say</h2>
		                </Card.Title>
		                <Card.Text>
							Don't just take our word for it – hear from those who have experienced our product firsthand. Here's what our valued customers have to say:<br/>
							John D. - "Exceptional service! This product has revolutionized the way I work."<br/>
							Sarah K. - "I'm beyond impressed with the results. It's been a game-changer for my business."<br/>
							Mike S. - "The support team is outstanding. They're always there when I need them."
		                </Card.Text>
		            </Card.Body>
		        </Card>
		    </Col>
		    <Col xs={12} md={4}>
		        <Card className="cardHighlight p-3">
		            <Card.Body>
		                <Card.Title>
		                    <h2 className='text-center'>Stay Updated with Us</h2>
		                </Card.Title>
		                <Card.Text>
						Stay in the know with our latest updates and news. We're dedicated to providing you with the most current information to keep you informed and engaged
		                </Card.Text>
		            </Card.Body>
		        </Card>
		    </Col>
		</Row>
	)
}