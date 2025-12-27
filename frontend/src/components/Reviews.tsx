
import { reviews } from "../assets/assets"
import ratingIcon from '../assets/star_icon.png'
import blurStarIcon from '../assets/star_dull_icon.png'

function Reviews(){

    return (
        <div className="mt-20 px-10 flex flex-col justify-center items-center">
            <p className="text-center text-xl font-semibold">Reviews</p>
            <div className="flex flex-col justify-center items-center leading-relaxed mt-5">
                <p className="font-semibold mb-1">Share your thoughts</p>
                <p className="text-sm text-gray-600">If you've used this product, share your thoughts with other customers</p>
                <button className="px-3 py-2 mt-5 border rounded-md border-gray-300 hover:bg-gray-200">Write your thoughts</button>
            </div>
            <div className="mt-10 flex max-sm:flex-col flex-wrap justify-center items-center gap-20">
            {reviews.map((review)=>(
                <div>
                    <div className="flex justify-center items-center gap-5">
                        <img src={review.image} alt="review image"  className="rounded-full h-12 w-12 overflow-hidden object-cover"/>
                        <div className="flex flex-col">
                            <p className="text-xl font-semibold">{review.name}</p>
                            <div className="flex flex-row gap-2">
                                <img src={ratingIcon} alt="" className="w-5"/>
                                <img src={ratingIcon} alt="" className="w-5"/>
                                <img src={ratingIcon} alt="" className="w-5"/>
                                <img src={ratingIcon} alt="" className="w-5"/>
                                <img src={blurStarIcon} alt="" className="w-5"/>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-600 max-sm:w-[70vw] md:w-[40vw] lg:w-[40vw] xl:w-[30vw] mt-5">{review.text}</p>
                    <hr className="h-px border-none bg-gray-300 mt-10"/>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Reviews