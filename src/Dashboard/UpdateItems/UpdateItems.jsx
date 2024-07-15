
import { Helmet } from "react-helmet";

const UpdateItems = () => {
  // const updateItem =useLoaderData(); 
  //  const { id } = useParams();
  // const [update, setUpdate] = useState(null);
  // useEffect(() => {
  //   fetch(`http://localhost:5000/items/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUpdate(data);
  //     });
  // }, [id]);

  // const { name, price, short_details, image, rating, not } = update;

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
              <input type="text" placeholder="Update Food Name" name="name" required />
            </label>
            <label className="input input-bordered flex items-center w-full">
              <input type="text" placeholder="Update Food Price" name="price" required />
            </label>
          </div>

           {/* Line 2 */}
          <div className="flex justify-between gap-4 text-black mt-4">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input type="text" placeholder="Update Food Short Details" name="short" required />
            </label>
          </div>

           {/* Line 3 */}
          <div className="flex justify-between gap-4 text-black mt-4">
          <label className="input input-bordered flex items-center w-full">
              <input type="text w-full" placeholder="Update Food Long Details" name="long" required />
            </label>
          </div>

          {/* Line 4 */}
          <div className="flex justify-between gap-4 text-black mt-4">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input type="text" placeholder="Update Food Rating" name="rating" required />
            </label>
            <label className="input input-bordered flex items-center w-full">
              <input type="text" placeholder="Update Food Origin" name="origin" required />
            </label>
          </div>

          {/* Line 5 */}
          <div className="gap-4 text-black mt-4">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <input type="file" placeholder="Update Food Image" name="image" required />
            </label>
          </div>
         
          <button className="btn btn-success bg-lime-700 font-bold text-white mt-5">Update Food</button>
        </form>
            </div>
        </div>
    );
};

export default UpdateItems;