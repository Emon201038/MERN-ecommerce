import React from "react";
import "./head.css";

const Head = () => {
  return (
    <header className="header">
      <nav className="mr-auto home">
        <a href="/#" className="item">
          Shop now
        </a>
        <a href="/sellOnDaraz" className="item">
          sell on daraz
        </a>
        <a href="/donetDaraz" className="item">
          Donet daraz
        </a>
        <a href="order" className="item">
          Track my order
        </a>
        <a href="/signup" className="item">
          log in/Sign up
        </a>
        <a href="/castomersCare" className="item">
          Customers care
        </a>
      </nav>
    </header>
  );
};

export default Head;
