import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FaShoppingCart } from "react-icons/fa";
import "./product.css";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const Product = (props) => {
  const { product, totalProducts } = props;
  const handleClick = () => {
    console.log(product.id);
  };

  const renderRatingStars = () => {
    const rating = product.rating;
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
    <Card
      style={{ width: "18%", margin: "10px 10px", height: "450px" }}
      onClick={handleClick}
    >
      <Card.Img
        variant="top"
        src={product.images[0]}
        style={{ width: "100%", height: "150px" }}
      />
      <Card.Body>
        <Card.Title
          style={{
            maxHeight: "50px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.title}
        </Card.Title>

        <Card.Text>Price : {product.price} $</Card.Text>
        <Card.Text>
          Original price:
          <del>
            {`${(
              (100 * product.price) /
              (100 - product.discountPercentage)
            ).toFixed(2)}`}
            $
          </del>
        </Card.Text>
        <div>{renderRatingStars()}</div>

        <Card.Text>Discount:{product.discountPercentage}%</Card.Text>
        <Button
          style={{
            float: "right",
            backgroundColor: "white",
            color: "black",
            border: "none",
            fontSize: "30px",
          }}
        >
          <FaShoppingCart />
        </Button>
        <Button style={{ float: "left" }}>Order Now</Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
