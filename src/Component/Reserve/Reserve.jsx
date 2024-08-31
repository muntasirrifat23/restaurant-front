import { useState } from "react";
import "./Reserve.css";
import { BiFoodMenu } from "react-icons/bi";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const Reserve = () => {
  const [seats, setSeats] = useState("");
  // const [selectedDate, setSelectedDate] = useState("");


  const currentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()+1).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const maxDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 5);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); 
    const day = String(today.getDate()).padStart(2, "0"); 
    return `${day}, ${month},${year}`;
  };
  
  const handleTime = () => {
    const options = [];
    for (let hour = 10; hour <= 21.5; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
        options.push(<option key={time} value={time}>{time}</option>);
      }
    }
    return options;
  };

  const handleSeat = (e) => {
    const value = Number(e.target.value);
    if (value < 1 || value > 5) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Seat Count',
        text: 'You can reserve 1 - 5 seats',
      });
      setSeats(""); 
    } else {
      setSeats(value);
    }
  };

  const handleReserve=(e)=>{
    e.preventDefault();
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const date = e.target.date.value;
    const time = e.target.time.value;
    const seat = e.target.seat.value;
    const email = e.target.email.value;
    const note = e.target.note.value;
    const customer = {name, phone, date, time, seat, email, note}
    console.log(customer);

    const today = new Date();
    const selected = new Date(date);
    const maxSelectableDate = new Date(today);
    maxSelectableDate.setDate(today.getDate() + 5);

    if (selected < new Date(currentDate()) || selected > maxSelectableDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Date',
        text: 'Can be select next day to after 7 days',
      });
      return;
    }

    fetch('http://localhost:5000/reserve', {
      method: 'POST',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(customer)
  })
      .then(res => res.json())
      .then(data => {
          console.log(data);
          if (data.insertedId) {
            Swal.fire("Thank You For Reservation");
          }
      })
    

  }

  return (
    <div className="hero ">
       <Helmet>
        <title>Food Court | Reservation</title>
      </Helmet>
      <div className="mt-24 reserveImg mb-20">
        <div className="reserveText text-center">
          <p className="font-semibold text-6xl mb-12 mt-24">Reservations</p>

          <form onSubmit={handleReserve}>
                <div className="flex justify-between gap-4 text-black mt-4">
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" placeholder="Name" name="name" required />
            </label>
            <label className="input input-bordered flex items-center">
              <input type="text" placeholder="Phone" name="phone" required />
            </label>
          </div>

          <div className="flex justify-between gap-4 text-black mt-2">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input type="date" name="date" required
                min={currentDate()}
                max={maxDate()} />
            </label>
            <label className="input input-bordered flex items-center w-full">
              <select className="w-full" name="time" required>
                {handleTime()}
              </select>
            </label>
          </div>

          <div className="flex justify-between gap-4 text-black mt-2">
              <label className="input input-bordered flex items-center gap-2">
              <input type="number" placeholder="Seat Needs" value={seats} onChange={handleSeat} min="" name="seat" required
              />
            </label>
            <label className="input input-bordered flex items-center">
              <input type="email" placeholder="Email" name="email" required />
            </label>
          </div>

          <div className="text-black mt-2 mb-2">
            <label className="input input-bordered flex items-center w-full">
              <input className="w-full" type="text" placeholder="Notes" name="note" required />
            </label>
          </div>

          <button className="reserveBtn btn">
            Book A Table
            <BiFoodMenu className="text-lg"></BiFoodMenu>
          </button>
          </form>
          <div>


          </div>
      
        </div>
      </div>
    </div>
  );
};

export default Reserve;
