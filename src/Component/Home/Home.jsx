// import { useContext, useState } from "react";
// import { AuthContext } from "../Auth/AuthProvider";
// import LeftPage from "../../Pages/LeftPage/LeftPage";
// import RightPage from "../../Pages/RightPage/RightPage";
// import { useLoaderData } from "react-router-dom";
// import Card from "../Items/Card";

import Banner from "./Banner";


const Home = () => {
    // const user = useContext(AuthContext);
    // const [dataLength, setDataLength] = useState(6);
    // const items = useLoaderData();

    return (
        <div>
            <Banner></Banner>
            
        </div>



        // <div>
        //     {user.displayName}
        //     <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
        //         <div>
        //             <LeftPage></LeftPage>
        //         </div>

        //         <div className="col-span-2 m-4">
        //             {/* Middle Page */}
        //             <div className='grid lg:grid-cols-2 gap-4'>
        //                 {
        //                     items.slice(0, dataLength).map(item => (
        //                         <Card key={item.id} item={item}></Card>
        //                     ))
        //                 }
        //             </div>
        //             <button
        //                 className="btn btn-error mt-6 font-bold mx-auto justify-center card px-12 text-xl"
        //                 onClick={() => setDataLength(items.length)}>  Show All
        //             </button>
        //         </div>

        //         <div>
        //             <RightPage></RightPage>
        //         </div>
        //     </div>
        // </div>
    );
};

export default Home;
