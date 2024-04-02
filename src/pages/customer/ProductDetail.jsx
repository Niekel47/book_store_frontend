import React from 'react'
import Navbar from '../../components/NavBar/NavBar'
import ProductDetailList from '../../components/ProductDetail/ProductDetailList'
import Footer from '../../components/Footer/Footer'
import AOS from "aos";
import OrderPopup from '../../components/OrderPopup/OrderPopup';

const ProductDetail = () => {
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
    <>
      <Navbar handleOrderPopup={handleOrderPopup}></Navbar>
      <ProductDetailList></ProductDetailList>
      <Footer></Footer>
      <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
    </>
  );
}

export default ProductDetail