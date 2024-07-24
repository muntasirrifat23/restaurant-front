import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const AddItems = () => {
  const handleAddItems = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const price = e.target.price.value;
    const short_details = e.target.short_details.value;
    const long_details = e.target.long_details.value;
    const rating = e.target.rating.value;
    const origin = e.target.origin.value;
    const image = e.target.image.value;
    const addItemDetails = { name, price, short_details, long_details, rating, origin, image };
    console.log(addItemDetails);

    fetch("http://localhost:5000/items", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addItemDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire("Added New Food");
        }
      });
  };

  return (
    <div className="hero-content mx-auto">
      <Helmet>
        <title>Food Court | Add Items</title>
      </Helmet>
      <div className="mb-10 text-center">
        <p className="font-semibold lg:text-5xl text-3xl mb-12 mt-24 bg-pink-600 text-white rounded-md p-4">
          Add New Food To The Items
        </p>

        <form onSubmit={handleAddItems}>
          <div className="flex justify-between gap-4 text-black mt-4 ">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input type="text" placeholder="Food Name" name="name" required />
            </label>
            <label className="input input-bordered flex items-center w-full">
              <input type="text" placeholder="Food Price" name="price" required />
            </label>
          </div>

             {/* Line 2 */}
             <div className="flex justify-between gap-4 text-black mt-4">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input type="text" placeholder="Food Short Details" name="short_details" required />
            </label>
          </div>

           {/* Line 3 */}
          <div className="flex justify-between gap-4 text-black mt-4">
          <label className="input input-bordered flex items-center w-full">
              <input type="text" placeholder="Food Long Details" name="long_details" required />
            </label>
          </div>

          {/* Line 4 */}
          <div className="flex justify-between gap-4 text-black mt-4">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input type="text" placeholder="Food Rating" name="rating" required />
            </label>
            <label className="input input-bordered flex items-center w-full">
              <input type="text" placeholder="Food Origin" name="origin" required />
            </label>
          </div>

          {/* Line 5 */}
          <div className="gap-4 text-black mt-4">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input type="file" placeholder="Food Image" name="image" required />
            </label>
          </div>
         
          <button className="reserveBtn btn mt-5">Add New Food</button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
