import { Outlet } from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../Footer/Footer";

const Main = () => {
    return (
        <div className="text-black bg-white">
            <Header className="mb-20"></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main; 