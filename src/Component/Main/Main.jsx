import { Outlet } from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../Footer/Footer";

const Main = () => {
    return (
        <div className="text-black bg-white">
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main; 