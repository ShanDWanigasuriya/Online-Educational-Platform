"use client";
import { styles } from "@/app/styles/style";
import React from "react";
import { Button } from "../ui/button";
import { useShoppingCart } from "use-shopping-cart";

export interface ProductCart {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  price_id: string;
}

const AddToCart = ({
  id,
  name,
  currency,
  description,
  price,
  image,
  price_id,
}: ProductCart) => {
  const { addItem, handleCartClick } = useShoppingCart();

  const product = {
    id: id,
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: image,
    price_id: price_id,
  };

  // const cart = useCart();

  // const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
  //   event.stopPropagation();

  //   cart.addItem(data);
  //   console.log(data);
  // };
  const handleAddToCart = () => {
    // Add product to shopping cart
    addItem(product);

    // Store course details in localStorage
    const courseDetails = {
      courseId: id,
      courseName: name,
      coursePrice: price,
    };

    // Retrieve existing course details from localStorage
    const existingCourses = JSON.parse(localStorage.getItem("cartCourses") || "[]");

    // Update course details with the new course
    const updatedCourses = [...existingCourses, courseDetails];

    // Store updated course details in localStorage
    localStorage.setItem("cartCourses", JSON.stringify(updatedCourses));

    // Show the cart (toggle)
    handleCartClick();
  };

  return (
    <div>
      <div
        className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
        onClick={handleAddToCart}
      >
        Add to Cart
      </div>
    </div>
  );
};

export default AddToCart;
