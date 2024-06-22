import { useLoaderData } from "react-router-dom";
import Card from "../Home/Card";
import { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";

const Items = () => {
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
             <div className="col-span-2 m-4">
                    {/* Middle Page */}
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4'>
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
        </div>
    );
};

export default Items;