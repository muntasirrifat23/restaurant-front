import { Helmet } from "react-helmet";

const UpdateItems = () => {
    return (
        <div className="hero-content mx-auto">
            <Helmet>
        <title>Food Court | Update Items</title>
      </Helmet>

      <div className="mb-10 text-center">

           
           <p className="font-semibold lg:text-5xl text-3xl mb-12 mt-24 bg-lime-600 text-white rounded-md p-4">
          Update Food To The Items
        </p>

        <form>
          <div className="flex justify-between gap-4 text-black mt-4 ">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input type="text" placeholder="Update FoodName" name="name" required />
            </label>
            <label className="input input-bordered flex items-center w-full">
              <input type="text" placeholder="Update FoodPrice" name="price" required />
            </label>
          </div>

           {/* Line 2 */}
          <div className="flex justify-between gap-4 text-black mt-4">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input type="text" placeholder="Update FoodShort Details" name="short" required />
            </label>
          </div>

           {/* Line 3 */}
          <div className="flex justify-between gap-4 text-black mt-4">
          <label className="input input-bordered flex items-center w-full">
              <input type="text" placeholder="Update FoodLong Details" name="long" required />
            </label>
          </div>

          {/* Line 4 */}
          <div className="flex justify-between gap-4 text-black mt-4">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input type="text" placeholder="Update FoodRating" name="rating" required />
            </label>
            <label className="input input-bordered flex items-center w-full">
              <input type="text" placeholder="Update FoodOrigin" name="origin" required />
            </label>
          </div>

          {/* Line 5 */}
          <div className="gap-4 text-black mt-4">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input type="file" placeholder="Update FoodImage" name="image" required />
            </label>
          </div>
         
          <button className="btn btn-success bg-lime-700 font-bold text-white mt-5">Update Food</button>
        </form>
            </div>
        </div>
    );
};

export default UpdateItems;