import { Helmet } from "react-helmet";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateItems = () => {
  const update =useLoaderData();
  const { name, price, short_details, long_details, rating, origin, _id } = update;
  const navigate= useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const price = e.target.price.value;
    const short_details = e.target.short_details.value;
    const long_details = e.target.long_details.value;
    const rating = e.target.rating.value;
    const origin = e.target.origin.value;
    const image = e.target.image.value;
    const updateItemDetails = { name, price, short_details, long_details, rating, origin, image };
    console.log(updateItemDetails);

    fetch(`http://localhost:5000/items/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateItemDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.matchedCount ==1 ) {
          Swal.fire("Food Updated");
          navigate('/allItems');
        } 
        else {
          Swal.fire("Update Failed");
        }
      });
  };


    return (
      <div className="addItemsImg">
        {/* <div className="hero-content mx-auto"> */}
            <Helmet>
        <title>Food Court | Update Items</title>
      </Helmet>

      <div className="mb-10 text-center mt-20">
           <p className="font-semibold lg:text-6xl text-4xl mb-12 mt-24 bg-lime-600 text-white rounded-md p-4">
          Update {name} To The Items
        </p>

        <form onSubmit={handleUpdate}>
          <div className="flex justify-between gap-4 text-black mt-4 ">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input type="text" placeholder="Update Food Name" name="name" required defaultValue={name} />
            </label>
            <label className="input input-bordered flex items-center w-full">
              <input type="text" placeholder="Update Food Price" name="price" required defaultValue={price} />
            </label>
          </div>

           {/* Line 2 */}
           <div className="flex justify-between text-black mt-4">
             <label className="input input-bordered flex items-center w-full">
              <input type="text" placeholder="Update Food Short Details" name="short_details" required defaultValue={short_details}/>
              </label>
          </div>

           {/* Line 3 */}
          <div className="  text-black mt-4">
          <label className="input input-bordered flex items-center w-full">
              <input type="text" placeholder="Update Food Long Details" name="long_details" required defaultValue={long_details} />
            </label>
          </div>

          {/* Line 4 */}
          <div className="flex justify-between gap-4 text-black mt-4">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input type="text" placeholder="Update Food Rating" name="rating" required defaultValue={rating} />
            </label>
            <label className="input input-bordered flex items-center w-full">
              <input type="text" placeholder="Update Food Origin" name="origin" required defaultValue={origin} />
            </label>
          </div>

          {/* Line 5 */}
          <div className="gap-4 text-black mt-4">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input type="file" placeholder="Update FoodImage" name="image" required  />
            </label>
          </div>
         
         <div className="flex justify-center">
         <button className="btn btn-success bg-lime-700 font-bold text-white mt-5">Update Food</button>

         <div>
         <Link to="/allItems" className="gap-4 text-xl items-center ml-5">
          <button className="btn btn-error bg-red-700 font-bold text-white mt-5">
           <FaArrowLeft /> Back
        </button>
        </Link>
         </div>
         </div>
        </form>
            </div>
        </div>
    );
};

export default UpdateItems;