import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import useAuth from "../../CustomHooks/useAuth";

const CheckoutForm = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const element = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState();
  const axiosSecure = useAxiosSecure();
  const [transactionId, setTransactionId] = useState();
  const totalPrice = 23;
  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: totalPrice })
      .then((res) => {
        console.log(res.data);
        setClientSecret(res.data);
      });
  }, [axiosSecure]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !element) {
      return;
    }
    const card = element.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment err", error);
      setError(error.message);
    } else {
      console.log("payment Method", paymentMethod);
      setError("");
    }

    //Now Confirm the payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.name,
            email: user?.email,
          },
        },
      });
    if (confirmError) {
      console.log("error from confirmError", confirmError);
    } else {
      console.log(paymentIntent);
      if (paymentIntent.status === "succeeded") {
        //here will get transaction id
        setTransactionId(paymentIntent.id);

        // now save the payment history in db
        const payment = {
          email: user?.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          status: "pending",
        };
        // now call the payment route
        const res = await axiosSecure.post("/payment", payment);
        console.log(res.data);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-accent mt-6"
          type="submit"
          disabled={!stripe}
        >
          Pay
        </button>
        <p className="text-red-500 ">{error}</p>
      </form>
    </div>
  );
};

export default CheckoutForm;
