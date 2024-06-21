import { useEffect, useState } from "react";

const LeftPage = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch('../../../public/items.json')
        .then(res=>res.json())
        .then(data=>setItems(data))
    }, [])
    return (
        <div className="m-4">
            {/* Food Items */}
            <section>
            <p className="text-2xl font-bold mx-auto text-center  text-white bg-black p-3 rounded-xl mb-4">Food Items</p>
            <div> 
               {/* <p> {items.length}</p>  */}
               {
                items.map(item=><p key={item.id}
                    className="block font-semibold text-xl mt-2 bg-lime-300 p-2 rounded-xl"
                > {item.id}. {item.name}</p>)
               }

            </div>
            </section>

            <section>
                
            </section>
            
        </div>
    );
};

export default LeftPage;