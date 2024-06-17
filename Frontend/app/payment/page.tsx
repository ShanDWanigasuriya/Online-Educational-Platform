"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Success from "../payment/success";
import { useCreateOrderMutation } from "@/redux/features/payment/paymentApi";
import { toast } from "react-hot-toast";

const Page = () => {
  const [receipt, setReceipt] = useState<string | null>(null);
  const [createOrder, { data, error }] = useCreateOrderMutation();
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sessionId = localStorage.getItem("stripeSessionId");
    const courseId = localStorage.getItem("stripeCourseId");
    const sessionIds = localStorage.getItem("stripeSessionIds");
    const cartCourses = JSON.parse(
      localStorage.getItem("stripeCourseIds") || "[]"
    );
    console.log(cartCourses);

    async function fetchPaymentDetails(
      sessionId: string | null,
      courseId: string | null,
      sessionIds: string | null,
      cartCourses: string[]
    ) {
      if (sessionId && courseId) {
        try {
          localStorage.removeItem("stripeCourseId");
          localStorage.removeItem("stripeSessionId");
          const stripe = require("stripe")(
            "sk_test_51PB1CBIkQxNhsnF8eZtM0ZCGLxLQvILsgHjC6PumS3hntAXOy9w5TD9Q4MfBNB0cDrG3LXAexqaPvFNVdBevDt4c00ewD6mnHv"
          );

          const retrievedSession = await stripe.checkout.sessions.retrieve(
            sessionId,
            {
              expand: ["payment_intent"],
            }
          );
          const paymentIntentId = retrievedSession.payment_intent.id;
          const allCharges = await stripe.charges.list({ limit: 100 });
          const charge = allCharges.data.find(
            (charge: any) => charge.payment_intent === paymentIntentId
          );

          if (charge) {
            const receiptUrl = charge.receipt_url;
            setReceipt(receiptUrl);

            // Single course order
            createOrder({
              courseId: courseId,
              payment_info: retrievedSession.payment_intent,
            });
          } else {
            console.log(
              "No charge found for the Payment Intent ID:",
              paymentIntentId
            );
          }
        } catch (error) {
          console.error("Error retrieving payment details:", error);
          toast.error("Error retrieving payment details. Please try again.");
        }
      } else if (sessionIds && cartCourses) {
        try {
          localStorage.removeItem("stripeSessionIds");
          localStorage.removeItem("stripeCourseIds");
          const stripe = require("stripe")(
            "sk_test_51PB1CBIkQxNhsnF8eZtM0ZCGLxLQvILsgHjC6PumS3hntAXOy9w5TD9Q4MfBNB0cDrG3LXAexqaPvFNVdBevDt4c00ewD6mnHv"
          );
          const retrievedSession = await stripe.checkout.sessions.retrieve(
            sessionIds,
            {
              expand: ["payment_intent"],
            }
          );

          const paymentIntentId = retrievedSession.payment_intent.id;
          const allCharges = await stripe.charges.list({ limit: 100 });
          const charge = allCharges.data.find(
            (charge: any) => charge.payment_intent === paymentIntentId
          );

          if (charge) {
            const receiptUrl = charge.receipt_url;
            setReceipt(receiptUrl);

            // Randomly select one courseId from courseIds
            //   const randomCourseId = cartCourses[Math.floor(Math.random() * cartCourses.length)];
            //   console.log(randomCourseId);

            // Create the order for the randomly selected courseId
            //   await createOrder({
            //     courseId: randomCourseId,
            //     payment_info: retrievedSession.payment_intent,
            //   });

            // Multiple course orders
            const orderPromises = cartCourses.map(async (id: string) => {
              // Await the createOrder function call
              await createOrder({
                courseId: id,
                payment_info: retrievedSession.payment_intent,
              });
            });

            // Wait for all order promises to resolve
            await Promise.all(orderPromises);
          } else {
            console.log(
              "No charge found for the Payment Intent ID:",
              paymentIntentId
            );
          }
        } catch (error) {
          console.error("Error retrieving payment details:", error);
          toast.error("Error retrieving payment details. Please try again.");
        }
      }
    }

    fetchPaymentDetails(sessionId, courseId, sessionIds, cartCourses);
  }, []);

  return (
    <div>
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={1}
      />
      <Success receiptUrl={receipt} />
      <Footer />
    </div>
  );
};

export default Page;
