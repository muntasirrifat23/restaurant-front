import { IoFastFoodOutline } from "react-icons/io5";

const Footer = () => {
    return (
        <div>
            <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
                <div className="text-2xl text-blue-800 font-bold italic">
                    <p className="text-3xl">Authentic Best Foods in The Town</p>
                    <p className="text-red-600 flex gap-3"> Yummy Food<IoFastFoodOutline />
                    </p>
                </div>
                <div className="font-semibold">
                    <p className="flex gap-4">
                        <p className="underline">Dhaka</p>
                        <p className="underline">Sylhet</p>
                        <p className="underline">Rajshahi</p>
                        <p className="underline">Khulna</p>
                    </p>
                </div>
                <div>
                    <p> Head Office: House #29, Road #02, Sector #11</p>
                    <p>Uttara, Dhaka, Bangladesh</p>
                    <p>Phone: +8801987654321</p>
                </div>


                <aside>
                    <p>Copyright © 2024 - All right reserved by Food Court Ltd.</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;