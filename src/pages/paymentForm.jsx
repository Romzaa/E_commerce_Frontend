import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function PaymentForm() {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements)
            return;

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/"
            }
        });

        if (error) {
            console.log(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button type="submit" disabled={!stripe || !elements} className="btn btn-success mt-3">Pay Now</button>
        </form>
    )
}