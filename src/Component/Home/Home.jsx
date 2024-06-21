import { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import LeftPage from "../../Pages/LeftPage/LeftPage";
import RightPage from "../../Pages/RightPage/RightPage";
import { useLoaderData } from "react-router-dom";
import Card from "./Card";

const Home = () => {
    const user = useContext(AuthContext);
    const [dataLength, setDataLength] = useState(6);

    let foods = [];
    try {
        foods = useLoaderData();
    } 
    catch (error) {
        console.error("Failed to load data:", error);
    }

    const validFoods = Array.isArray(foods) ? foods : [];

    return (
        <div>
            {user.displayName}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
                <div>
                    <LeftPage></LeftPage>
                </div>

                <div className="col-span-2 m-4">
                    {/* Middle Page */}
                    <div className='grid lg:grid-cols-2 gap-4'>
                        {
                            validFoods.slice(0, dataLength).map(food => (
                                <Card key={food.id} food={food}></Card>
                            ))
                        }
                    </div>
                    <button
                        className="btn btn-error mt-6 font-bold mx-auto justify-center card px-12 text-xl"
                        onClick={() => setDataLength(validFoods.length)}
                    >
                        Show All
                    </button>
                </div>

                <div>
                    <RightPage></RightPage>
                </div>
            </div>
        </div>
    );
};

export default Home;
