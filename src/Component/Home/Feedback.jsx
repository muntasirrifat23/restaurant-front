
const Feedback = () => {
    const handleFeedback= e =>{
        e.preventDefault();
    }
  return (
    <div className='m-4 lg:m-12 mt-14' >
    <hr className='border-red-800 mx-auto' style={{ width: '40%' }} />
    <small className="text-center text-red-800"><p>
    Enhancing Your Dining Experience
    </p>
    </small>
    <div className='w-50 text-center justify-center'>
        <p className='text-center font-bold lg:text-5xl text-3xl italic text-red-800 mb-4'>
            <p>Give Us Feedback</p>
            <hr className='border-red-800 mx-auto' style={{ width: '40%' }} />
        </p>
    </div>
    
    <div className="border-2 bg-blue-600  text-center rounded-xl">  
      <form onSubmit={handleFeedback} >
        <div className="text-black mt-4 text-center justify-center items-center">
          <label className="input input-bordered flex items-center gap-2 m-10">
            <input type="text" placeholder="Your Full Name" name="name" required />
          </label>
          <label className="input input-bordered flex items-center m-10">
            <input type="text" className="w-full" placeholder="Give Us Your Feedback" name="feedback" required />
          </label>
        </div>

        <button className="reserveBtn btn mb-10">Sent Feedback</button>
      </form>
    </div>
    </div>
  );
};

export default Feedback;
