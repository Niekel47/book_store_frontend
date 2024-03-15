import React from "react";
import Navbar from "../NavBar/NavBar";
import Hero from "../Hero/Hero";
import Banner from "../Banner/Banner";
import AOS from "aos";
import Footer from "../Footer/Footer";
import OrderPopup from "../OrderPopup/OrderPopup";
import ProductList from "../ProductList/ProductList";

const Home = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Navbar handleOrderPopup={handleOrderPopup}></Navbar>
      <Hero handleOrderPopup={handleOrderPopup}></Hero>
      <ProductList></ProductList>
      <Banner></Banner>
      <Footer />
      <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
    </div>
  );
};

export default Home;
