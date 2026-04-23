import type { RequestHandler } from "express";
import paymentService from "./payment.service";

const createPaymentIntent : RequestHandler = async (req , res) =>{
   try {
    const {amount} = req.body;

    if(!amount || typeof amount !== "number"){
       res.status(400)
       .json({
        success : false,
        message : "Invalid amount provided"
       })
       return;
    }
    const {clientSecret} = await paymentService.createPaymentIntent(amount);
    res.status(200)
    .json({
      success : true,
      clientSecret,
    } )
   } catch (error) {
    console.log(error , "error from payment controller");
    res.status(500)
    .json({
      success : false,
      message : "Failed to create payment intent",
    })
   }
}
  
export const paymentController = {
    createPaymentIntent,
}