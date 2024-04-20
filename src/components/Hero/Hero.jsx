import banner1 from "../../assets/books/banner1.jpg";
import banner2 from "../../assets/books/banner2.jpg";
import banner3 from "../../assets/books/banner3.jpg";
import React from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

const Hero = () => {
  return (
    <>
      <MDBCarousel showControls>
        <MDBCarouselItem itemId={1}>
          <img src={banner1} className="d-block h-[500px] w-100" alt="..." />
        </MDBCarouselItem>
        <MDBCarouselItem itemId={2}>
          <img src={banner2} className="d-block h-[500px] w-100" alt="..." />
        </MDBCarouselItem>
        <MDBCarouselItem itemId={3}>
          <img src={banner3} className="d-block h-[500px] w-100" alt="..." />
        </MDBCarouselItem>
      </MDBCarousel>
    </>
  );
};
export default Hero;
