import { useState } from "react";
import "./Reserve.css";
import { BiFoodMenu } from "react-icons/bi";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const Reserve = () => {
  const [seats, setSeats] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    seat: "",
    email: "",
    note: "",
  });

  const currentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate() + 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const maxDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 7); // Set max to 7 days from now
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleTime = () => {
    const options = [];
    for (let hour = 10; hour <= 22.5; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        let formattedHour = hour % 12 || 12; // Convert to 12-hour format
        const period = hour < 12 ? "AM" : "PM";
        const time = `${String(formattedHour).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${period}`;
        options.push(
          <option key={time} value={time}>
            {time}
          </option>
        );
      }
    }
    return options;
  };

  const handleSeat = (e) => {
    const value = Number(e.target.value);
    if (value < 1 || value > 5) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Seat Count",
        text: "You can reserve 1 - 5 seats",
      });
      setSeats("");
    } else {
      setSeats(value);
      setFormValues({ ...formValues, seat: value });
    }
  };

  const handleDate = (e) => {
    const selected = new Date(e.target.value);
    const today = new Date();
    const minSelectableDate = new Date(currentDate());
    const maxSelectableDate = new Date(today);
    maxSelectableDate.setDate(today.getDate() + 7);

    if (selected < minSelectableDate || selected > maxSelectableDate) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Date",
        text: "Please select a date between tomorrow and the next 7 days.",
      });
      setSelectedDate("");
    } else {
      setSelectedDate(e.target.value);
      setFormValues({ ...formValues, date: e.target.value });
    }
  };

  const handleReserve = (e) => {
    e.preventDefault();
    const { name, phone, date, time, seat, email, note } = formValues;

    const customer = { name, phone, date, time, seat, email, note };
    console.log(customer);

    fetch("http://localhost:5000/reserve", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire("Thank You For Reservation");
          // Clear the form
          setFormValues({
            name: "",
            phone: "",
            date: "",
            time: "",
            seat: "",
            email: "",
            note: "",
          });
          setSeats("");
          setSelectedDate("");
        }
      });
  };

  return (
    <div className="hero">
      <Helmet>
        <title>Food Court | Reservation</title>
      </Helmet>
      <div className="mt-24 reserveImg mb-20">
        <div className="reserveText text-center">
          <p className="font-semibold text-6xl mb-12 mt-24">Reservations</p>

          <form onSubmit={handleReserve}>
            <div className="flex justify-between gap-4 text-black mt-4">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={formValues.name}
                  onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                  required
                />
              </label>
              <label className="input input-bordered flex items-center">
                <input
                  type="text"
                  placeholder="Phone 01234567890"
                  name="phone"
                  value={formValues.phone}
                  onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
                  required
                />
              </label>
            </div>

            <div className="flex justify-between gap-4 text-black mt-2">
              <label className="input input-bordered flex items-center gap-2 w-full">
                <input
                  type="date"
                  name="date"
                  required
                  min={currentDate()}
                  max={maxDate()}
                  value={selectedDate}
                  onChange={handleDate}
                />
              </label>
              <label className="input input-bordered flex items-center w-full">
                <select
                  className="w-full"
                  name="time"
                  required
                  value={formValues.time}
                  onChange={(e) => setFormValues({ ...formValues, time: e.target.value })}
                >
                  {handleTime()}
                </select>
              </label>
            </div>

            <div className="flex justify-between gap-4 text-black mt-2">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Seat Needs"
                  value={seats}
                  onChange={handleSeat}
                  name="seat"
                  required
                />
              </label>
              <label className="input input-bordered flex items-center">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formValues.email}
                  onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                  required
                />
              </label>
            </div>

            <div className="text-black mt-2 mb-2">
              <label className="input input-bordered flex items-center w-full">
                <input
                  className="w-full"
                  type="text"
                  placeholder="Notes"
                  name="note"
                  value={formValues.note}
                  onChange={(e) => setFormValues({ ...formValues, note: e.target.value })}
                />
              </label>
            </div>

            <button className="reserveBtn btn">
              Book A Table
              <BiFoodMenu className="text-lg" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
