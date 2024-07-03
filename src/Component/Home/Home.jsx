import Banner from "./Banner";
import Chef from "./Chef";
import HomeFood from "./HomeFood";
import { Helmet } from "react-helmet";
import Review from "./Review";
import HomeOrder from "./HomeOrder";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Food Court | Home</title>
            </Helmet>
            <Banner></Banner>
            <HomeFood></HomeFood>
            <HomeOrder></HomeOrder>
            <Chef></Chef>
            <Review></Review>
        </div>
    );
};

export default Home;
