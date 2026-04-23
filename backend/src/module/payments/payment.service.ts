
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia" as any,
});

const paymentService = {
  createPaymentIntent: async(amount : number)=>{
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
      });

      return {
        clientSecret : paymentIntent.client_secret,
      }
    } catch (error) {
      console.log(error , "error from payment service");
      throw new Error("Failed to create payment intent");
    }
  }
}

export default paymentService;
