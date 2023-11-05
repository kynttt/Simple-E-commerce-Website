import Banner from '../components/Banner';
import Highlights from '../components/Highlights';
import FeaturedProducts from '../components/FeaturedProducts';

export default function Home() {

	const data = {
		title: "WELCOME TO MY SHOP",
		content: "Affordable Laptops for everyone!",
		destination: "/products",
		label: "Shop now!"
	}

	return(
		<>
		<div className='bg-dark text-white'>
			<Banner data={data}/>
		</div>
			<FeaturedProducts/>
		<div className='my-5'>
			<Highlights />
		</div>
		</>
	)
}