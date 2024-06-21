import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import chef1 from '../../../public/chef1.jpeg';
import chef2 from '../../../public/chef2.jpeg';
// import chef3 from '../../../public/chef3.jpeg';
import chef4 from '../../../public/chef4.jpeg';
import chef5 from '../../../public/chef5.jpeg';
import "./RightPage.css"

import banner from '../../../public/banner.png'
const RightPage = () => {
    return (
        <div className='m-4'>
            <p className='d-none d-lg-block'>
            <img src={banner} className='lg:w-full mx-auto mb-4 rounded-lg' alt="banner" />
            </p>
            
            {/* Section 1 */}
            <section >
            <div className='text-center'>
                <p className='font-semibold text-white bg-black p-3 rounded-xl text-2xl mb-2'>Connect Us On</p>
                <div className='flex mx-auto text-center text-blue-800'>
                    <FaFacebook className='mr'></FaFacebook>
                    <p>Facebook</p>
                </div>
                <div className='flex text-center text-orange-600'>
                    <FaInstagram className='mr'></FaInstagram> 
                    Instagram
                </div>
                <div className='flex text-center text-red-700 mb-6'>
                    <FaYoutube className='mr'></FaYoutube>
                    Youtube
                </div>
            </div>
            </section>

            {/* Section 2 */}
            <section className='font-semibold '>
            <p className='font-semibold text-white bg-black p-3 rounded-xl text-2xl mb-2 text-center'>Our Chefs</p>

                <div className='flex mb-4 '>
                    <img src={chef1} alt="" />
                    <p>Masaharu Morimoto</p>
                </div>
                <div className='flex mb-4'>
                <img src={chef2} alt="" />
                    <p>David Chang</p>
                </div>
                {/* <div className='flex mb-4'>
                    <img src={chef3} alt="" />
                    <p>Yotam Ottolenghi</p>
                </div> */}
                <div className='flex mb-4'>
                    <img src={chef4} alt="" />
                    <p>Gaggan Anand</p>
                </div>
                <div className='flex'>
                    <img src={chef5} alt="" />
                    <p>Vikas Khanna</p>
                </div>

                
            </section>
           
        </div>
    );
};

export default RightPage;