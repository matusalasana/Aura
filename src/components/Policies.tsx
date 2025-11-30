
import exchangeIcon from '../assets/exchange_icon.png'
import returnIcon from '../assets/quality_icon.png'
import customerSupportIcon from '../assets/support_img.png'

function Policies() {
  return (
    <div className='flex max-sm:flex-col justify-between gap-10 px-10'>
        <div className='flex flex-col justify-center items-center'>
            <img src={exchangeIcon} alt="policy" className='w-12' />
            <p className="text-xl font-semibold text-center">Easy Exchange Policy</p>
            <p className="text-gray-400 text-center">We offer hassle free exchane policy</p>
        </div>
        <div className='flex flex-col justify-center items-center'>
            <img src={returnIcon} alt="policy" className='w-12' />
            <p className="text-xl font-semibold text-center">7 Days Return Policy</p>
            <p className="text-gray-400 text-center">We provide 7 days free return policy</p>
        </div>
        <div className='flex flex-col justify-center items-center'>
            <img src={customerSupportIcon} alt="policy" className='w-12' />
            <p className="text-xl font-semibold text-center">Best Customer Support</p>
            <p className="text-gray-400 text-center">We provide 24/7 customer support</p>
        </div>
    </div>
  )
}

export default Policies