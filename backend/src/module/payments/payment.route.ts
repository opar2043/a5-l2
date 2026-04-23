import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();
router.post('/create-payment-intent' , paymentController.createPaymentIntent)

export const paymentRouter = router;