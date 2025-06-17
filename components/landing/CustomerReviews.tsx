import Heading from "../ui/Heading"
import ReviewCards from "./ReviewCards"

const CustomerReviews = () => {
	return (
		<section className="mt-32 flex h-fit flex-col space-y-5 bg-lightGreen p-3 pt-5 dark:bg-darkGreen">
			<Heading first="Customer" second="Reviews" className="flex justify-center" />
			<div className="flex h-fit w-full flex-col items-center justify-around gap-3 p-3 md:flex-row">

				<ReviewCards name="John Doe" image="/images/discs/benny.jpg" review="I love my custom disc!" />
				<ReviewCards name="John Doe" image="/images/discs/benny.jpg" review="I love my custom disc! The design is perfect! The design is perfect!" />
				<ReviewCards name="Jane Smith" image="/images/discs/cloudbreaker.png" review="The design is perfect! The design is perfect!" />
			</div>
		</section>
	)
}


export default CustomerReviews