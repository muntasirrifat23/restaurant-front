import { useState } from "react";
import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";
import Card from "../../Component/Items/Card";
import AllItemsCard from "./ItemsCard";

const AllItems = () => {
    const [dataLength, setDataLength] = useState(6);
    const [showAll, setShowAll] = useState(false);
    const items = useLoaderData();
    const foodItems = Array.isArray(items) ? items : [];
    const [search, setSearch] = useState('');
    const show = () => { 
        setShowAll(!showAll);
        if (!showAll) {
            setDataLength(items.length);
        } else {
            setDataLength(6);
        }
    };
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };
    const filterItems = foodItems.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-lime-100">
            <Helmet>
                <title>Food Court | Items</title>
            </Helmet>
            <div className="grid ">
                <div className="flex justify-center w-full mt-28 lg:mt-28 items-center">
                    <label className="font-semibold text-red-800 mr-4 text-xl">Search Food: </label>
                    <input
                        type="text"
                        placeholder="Search Your Favorite Food"
                        className="input input-bordered w-full max-w-xs"
                        value={search}
                        onChange={handleSearch}
                    />
                </div>

                <div className="grid">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 m-6 lg:m-12">
                        {filterItems.length > 0 ? (
                            filterItems.slice(0, dataLength).map((item) => (
                                <AllItemsCard key={item.id} item={item}></AllItemsCard>
                            ))
                        ) : (
                            <div className="text-center col-span-full text-red-600 font-semibold" >
                                <p className="text-lg">Food is not available</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <button className="btn btn-error mt-6 font-bold mx-auto justify-center card px-12 text-xl"
                onClick={show}>
                {showAll ? "Show Less" : "Show All"}
            </button>
        </div>
    );
};

export default AllItems;
