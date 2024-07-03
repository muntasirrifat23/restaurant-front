import { Link } from "react-router-dom";
const HomeOrder = () => {
    return (
        <div>
            <div
  className="hero min-h-screen"
  style={{
    backgroundImage: "url('')",
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
      <p className="mb-5">
      Providing delightful food and more. Offering flavors that assume exceptional tastes nearly. In delicacies and varied options to cater to all preferences.      </p>
      <button className="btn btn-primary">
      <Link to= '/items' >Order Now</Link>
      </button>
    </div>
  </div>
</div>
        </div>
    );
};

export default HomeOrder;