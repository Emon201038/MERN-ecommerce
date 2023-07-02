import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaShoppingCart } from "react-icons/fa";
import "./product.css";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const ProductSkeleton = (props) => {
  const { product } = props;

  const renderRatingStars = () => {
    const rating = product.rating.rate;
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = hasHalfStar ? 4 - filledStars : 5 - filledStars;

    return (
      <div>
        {[...Array(filledStars)].map((_, index) => (
          <FaStar key={index} color="gold" />
        ))}
        {hasHalfStar && <FaStarHalfAlt color="gold" />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={index} color="gold" />
        ))}
      </div>
    );
  };

  return (
    <Card style={{ width: "18%", margin: "10px 10px" }}>
      <Card.Img
        variant="top"
        src="../.././public/images/products/images.png"
        style={{ width: "200px", height: "200px" }}
      />
      <Card.Body>
        <Card.Title
          style={{
            backgroundColor: "gray",
            height: "50px",
            opacity: 0.3,
            borderRadius: "5px",
          }}
        ></Card.Title>

        <Card.Text
          style={{
            backgroundColor: "gray",
            height: "20px",
            opacity: 0.3,
            borderRadius: "5px",
          }}
        ></Card.Text>
        <div style={{ backgroundColor: "gray" }}></div>

        <Card.Text
          style={{
            backgroundColor: "gray",
            opacity: 0.3,
            borderRadius: "5px",
            margin: "85px 0",
          }}
        ></Card.Text>
        <Button
          style={{
            float: "right",
            backgroundColor: "gray",
            color: "black",
            border: "none",
            opacity: 0.3,
            borderRadius: "5px",
            width: "40px",
            height: "20px",
          }}
          disabled
        ></Button>
        <Button
          style={{
            float: "left",
            backgroundColor: "gray",
            width: "60px",
            height: "30px",
            opacity: 0.3,
            borderRadius: "5px",
          }}
          disabled
        ></Button>
      </Card.Body>
    </Card>
  );
};

export default ProductSkeleton;
