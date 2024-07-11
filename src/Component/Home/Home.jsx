import Banner from "./Banner";
import Chef from "./Chef";
import HomeFood from "./HomeFood";
import { Helmet } from "react-helmet";
import Review from "./Review";
import Feedback from "./Feedback";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Food Court | Home</title>
            </Helmet>
            <Banner></Banner>
            <HomeFood></HomeFood>
            <Chef></Chef>
            <Review></Review>
            <Feedback></Feedback>
            
        </div>
    );
};

export default Home;
