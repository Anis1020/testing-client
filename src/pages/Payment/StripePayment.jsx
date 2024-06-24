import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../checkout/CheckoutForm";

const stripePromise = loadStripe(
  `pk_test_51PTwYbRx0rjF2iiSOPVzLWOvEPXgjz9ETlYoNMcYfMvBsObfJ0bfUEykeciMrJLPjsveled4pejDszQgeXz8rKOU00mzEUtTNB`
);
const StripePayment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripePayment;
