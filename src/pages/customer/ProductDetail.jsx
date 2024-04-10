import React from 'react'
import Navbar from '../../components/NavBar/NavBar'
import ProductDetailList from "../../components/ProductDetail/ProductDetailList";
import Footer from '../../components/Footer/Footer'

const ProductDetail = () => {
  return (
    <>
      <Navbar></Navbar>
      <ProductDetailList></ProductDetailList>
      <Footer></Footer>
    </>
  );
}

export default ProductDetail