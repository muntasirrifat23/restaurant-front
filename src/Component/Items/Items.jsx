import Card from "./Card";
import { useState } from "react"; 
import { useLoaderData } from "react-router-dom";

const Items = () => {
    const [dataLength, setDataLength] = useState(6);
    const [showAll, setShowAll] = useState(false);
    const items = useLoaderData(); 
    const foodItems = Array.isArray(items) ? items : [];

    const show = () => {
        setShowAll(!showAll); 
        if (!showAll) {
            setDataLength(items.length);
        } else {
            setDataLength(6);
        }
    };

    return (
            <div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                    {foodItems.slice(0, dataLength).map((item) => (
                        <Card key={item.id} item={item}></Card>
                    ))}
                </div>
                <button className="btn btn-error mt-6 font-bold mx-auto justify-center card px-12 text-xl"
                    onClick={show}>
                    {showAll ? "Show Less" : "Show All"}
                </button>
            </div>
    );
};

export default Items;
