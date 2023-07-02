import React from "react";
import "./search-bar.css";
import { FaSistrix } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="container-fluid">
      <form action="" className="w-100">
        <input type="text" name="" id="" className="inputField formField" />
        <button className="buttonn formField">
          <FaSistrix className="btnn" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
