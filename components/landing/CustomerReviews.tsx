import Heading from "../ui/Heading"
import ReviewCards from "./ReviewCards"

const CustomerReviews = () => {
	return (
		<section className="mt-44 flex h-fit flex-col space-y-5 bg-lightGreen p-3 pt-5">
			<Heading first="Customer" second="Reviews" className="flex justify-center" />
			<div className="flex h-fit gap-3">
			</div>
			{/* Placeholder for Review Cards */}
			<ReviewCards name="John Doe" image="/images/discs/benny.jpg" review="I love my custom disc!" />
			<ReviewCards name="John Doe" image="/images/discs/benny.jpg" review="I love my custom disc!" />
			<ReviewCards name="Jane Smith" image="/images/discs/cloudbreaker.png" review="The design is perfect!" />
			{/* Add more ReviewCards as needed */}
			<div className="flex items-center justify-around">
			</div>
		</section>
	)
}


export default CustomerReviews