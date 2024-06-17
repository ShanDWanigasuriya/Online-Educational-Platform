"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../components/ui/sheet";
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";
import { on } from "events";
import { styles } from "@/app/styles/style";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useEffect, useState } from "react";

const ShoppingCartModal = () => {
  // const cartCount: number = 4;
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
    redirectToCheckout,
  } = useShoppingCart();

  //console.log(cartDetails);
  const items = Object.values(cartDetails ?? {}).map((entry) => entry.price_id);
  // Function to remove item from localStorage based on item id
  const removeFromLocalStorage = (itemId: any) => {
    const existingCart = JSON.parse(
      localStorage.getItem("cartCourses") || "[]"
    );
    const updatedCart = existingCart.filter(
      (item: any) => item.courseId !== itemId
    );
    localStorage.setItem("cartCourses", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    // Cleanup function to remove event listeners, etc.
    return () => {
      // Perform cleanup tasks if needed
    };
  }, []);

  const handleRemoveItem = (itemId: any) => {
    // Remove item from shopping cart
    removeItem(itemId);

    // Remove item from localStorage
    removeFromLocalStorage(itemId);
  };

  const { data: userData, refetch } = useLoadUserQuery(undefined, {});
  const [user, setUser] = useState<any>();

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  // const dicountPercentenge =
  //   ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;

  // const discountPercentengePrice = dicountPercentenge.toFixed(0);

  // const isPurchased =
  //   user && user?.courses?.find((item: any) => item._id === data._id);

  const handleOrder = async () => {
    try {
      const stripe = require("stripe")(
        "sk_test_51PB1CBIkQxNhsnF8eZtM0ZCGLxLQvILsgHjC6PumS3hntAXOy9w5TD9Q4MfBNB0cDrG3LXAexqaPvFNVdBevDt4c00ewD6mnHv"
      );

      // Retrieve cart items from localStorage
      const cartItems = JSON.parse(localStorage.getItem("cartCourses") || "[]");

      // Create line_items array for checkout session
      const lineItems = cartItems.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.courseName, // Assuming 'courseName' is the key for course name in cart item
          },
          unit_amount: item.coursePrice * 100,
        },
        quantity: 1,
      }));

      const options = {
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/payment", // Update success URL as needed
        cancel_url: "http://localhost:3000/payment/cancel", // Update cancel URL as needed
      };

      const session = await stripe.checkout.sessions.create(options);

      // Store session ID and course IDs in localStorage for reference
      localStorage.setItem("stripeSessionIds", session.id);
      localStorage.setItem(
        "stripeCourseIds",
        JSON.stringify(cartItems.map((item: any) => item.courseId))
      );

      // Clear cart items from localStorage after creating checkout session
      localStorage.removeItem("cartCourses");

      // Remove displayed cart items from UI
      Object.values(cartDetails ?? {}).forEach((entry) => {
        removeItem(entry.id);
      });

      // Redirect to checkout page
      window.location.href = session.url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      // Handle error
      toast.error("Error creating checkout session. Please try again.");
    }
  };

  // async function handleCheckoutClick(event: any) {
  //   event.preventDefault();

  //   try {
  //     const result = await redirectToCheckout();
  //     if (result?.error) {
  //       console.log("result");
  //     }
  //   } catch (err: any) {
  //     console.log(err.message);
  //   }
  // }

  // const onCheckout = async () => {
  //   console.log(items);
  //   try {
  //     const response = await axios.post("/api/checkout", {
  //       priceIds: items.map((item) => item.price_id),
  //     });
  //     console.log(response.data);
  //     toast.success(response.data.message);
  //     // removeAll();
  //     window.location = response.data.url;
  //   } catch (error: any) {
  //     toast.error("Troche Dupa");
  //   }
  // };

  return (
    <>
      <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
        <SheetContent className="sm:max-w-lg w-[90vw]  !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300">
          <SheetHeader>
            <SheetTitle className=" dark:text-white text-black">
              Cart
            </SheetTitle>
          </SheetHeader>

          <div className="h-full flex flex-col justify-between">
            <div className="mt-8 flex-1 overflow-y-auto">
              <ul className="-my-6 divide-y  dark:text-white text-black">
                {cartCount === 0 ? (
                  <h1 className="py-6">You do not have any items</h1>
                ) : (
                  <>
                    {Object.values(cartDetails ?? {}).map((entry) => (
                      <li key={entry.id} className="flex py-6 ">
                        <div className="h-20 w-18 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Image
                            src={entry.image as string}
                            width={100}
                            height={100}
                            objectFit="contain"
                            className="rounded w-full"
                            alt=""
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium dark:text-white text-black">
                              <h3>{entry.name}</h3>
                              <p className="ml-4">{entry.price}$</p>
                            </div>

                            <div className="flex flex-1 items justify-between text-sm">
                              <p className=" dark:text-white text-black">
                                QTY: {entry.quantity}
                              </p>
                              <div className="flex">
                                <button
                                  onClick={() => handleRemoveItem(entry.id)}
                                  type="button"
                                  className={`flex flex-row justify-center items-center py-2  rounded cursor-pointer bg-[#2190ff] min-h-[10px] text-[14px] font-Poppins font-semibold !w-[150px] my-4 font-Poppins cursor-pointer  dark:bg-white bg-black   dark:text-black text-white`}
                                  //className="w-full bg-black text-white"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium dark:text-white text-black">
                <p>Subtotal</p>
                <p>{totalPrice} $</p>
              </div>
              <p className="mt-0.5 text-sm dark:text-white text-black">
                Shipping and taxes are calculated at checkout
              </p>

              <div className="mt-6">
                <Button
                  onClick={handleOrder}
                  className="w-full dark:bg-white bg-black dark:text-black text-white"
                >
                  Pay now
                </Button>
              </div>

              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <Button
                  onClick={() => {
                    window.location.href = "/";
                  }}
                  className="w-full dark:bg-white bg-black dark:text-black text-white"
                >
                  Continue shopping
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ShoppingCartModal;
