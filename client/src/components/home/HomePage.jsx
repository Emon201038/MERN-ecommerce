import React, { useState } from "react";

import "./home.css";

import SearchBar from "./search-bar/SearchBar";
import { FaShoppingCart } from "react-icons/fa";
import Head from "./head/Head";
import Products from "./body/products/Products";

const HomePage = () => {
  return (
    <>
      <div className="container-fluid ml-0">
        <Head />
      </div>
      <div className="container-fluid mt-3 ml-0">
        <div className="row">
          <div className="col-md-3">
            <p>icon</p>
          </div>
          <div className=" col-md-6">
            <SearchBar />
          </div>
          <div className="col-md-3">
            <button className="cart formField">
              <FaShoppingCart className="btn1" />
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <Products />
      </div>
    </>
  );
};

export default HomePage;
