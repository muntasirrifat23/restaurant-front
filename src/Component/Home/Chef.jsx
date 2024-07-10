import { useEffect, useState } from "react";

const Chef = () => {
    const [ourChef, setOutChef] = useState([])
    useEffect(() => {
        fetch('../../../public/chef.json')
            .then(res => res.json())
            .then(data => {
                setOutChef(data);
            })
    }, [])
    return (
        <div>
            {/* {ourChef.length} */}
            <div className='lg:m-12 m-4'>
            <hr className='border-red-800 mx-auto' style={{ width: '30%' }} />
            <small className="text-center text-red-800"><p>Our Experienced Food Chef</p>
            </small>
                <div className='w-50 text-center justify-center'>
                    <p className='text-center font-bold lg:text-5xl text-3xl italic text-red-800 mb-4'>
                        <p>Our Chefs</p>
                        <hr className='border-red-800 mx-auto' style={{ width: '30%' }} />
                    </p>
                </div>

                <div className="grid lg:grid-cols-4 gap-6 ">
                    {
                        ourChef.map(chef => <div key={chef.id} className="card card-compact w-92 shadow-xl mx-auto rounded-xl lg:h-96">
                            <div className="place-items-center mt-2 bg-lime-200 rounded-xl h-full flex flex-col">
                                <img className="w-full" src={chef.pic} />
                                <div className="card-body p-4">
                                    <div className="text-center">
                                    <p className="text-lg font-bold text-red-800 underline">{chef.name}</p>
                                    <p className="text-base font-semibold">{chef.pos}</p>
                                    </div>
                                    
                                    <p className="text-sm">{chef.details}</p>
                                </div>
                            </div>

                        </div>)
                    }
                </div>


            </div>

        </div>
    );
};

export default Chef;