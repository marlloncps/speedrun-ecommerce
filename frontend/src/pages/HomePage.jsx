import React from "react";
import Header from "../components/Header";
import ProductsCardContainer from "../components/ProductsContainer";


function HomePage() {
  return (
    <>
      {/* <Container maxWidth={'xl'}> */}
      <Header />
      <ProductsCardContainer />
      {/* </Container> */}
    </>
  );
}
export default HomePage;
