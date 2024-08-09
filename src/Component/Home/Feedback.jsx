import Swal from "sweetalert2";

const Feedback = () => {
    const handleFeedback= (e) =>{
        e.preventDefault();
        const name= e.target.name.value;
        const message= e.target.message.value;
        const rating= parseFloat(e.target.rating.value);
        if (rating < 0 || rating > 5) {
          Swal.fire("Rating must be between 0 and 5");
          return;
      }
        const feedback ={name, message, rating};
        console.log(feedback);

        fetch('http://localhost:5000/feedback', {
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(feedback)
      })
          .then(res => res.json())
          .then(data => {
              if (data.insertedId) {
                  Swal.fire("Feedback Receive");
                  e.target.reset();
              }
          })
    }
  return (
    <div className='m-4 lg:m-12 mt-14' >
    <hr className='border-red-800 mx-auto' style={{ width: '40%' }} />
    <small className="text-center text-red-800">
    <p> Enhancing Your Dining Experience </p>
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
            <input type="text" className="w-full" placeholder="Give Us Your Feedback" name="message" required />
          </label>
          <label className="input input-bordered flex items-center m-10">
            <input type="number" className="w-full" placeholder="Give Us Your Rating Number" name="rating" required min={0} max={5} step={0.1}/>
          </label>
        </div>

        <button className="reserveBtn btn mb-10">Sent Feedback</button>
      </form>
    </div>
    </div>
  );
};

export default Feedback;
