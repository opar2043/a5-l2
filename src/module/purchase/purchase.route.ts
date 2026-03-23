import { Router } from "express";
import { purchasesController } from "./purchase.controller";


const router = Router();

router.post("/movies", purchasesController.createPurchase);
router.get("/movies", purchasesController.getPurchase);
router.get("/movies/:id", purchasesController.getSinglePurchase);
router.delete("/movies/:id", purchasesController.deletePurchase);
router.patch("/movies/:id", purchasesController.updatePurchase);

export const movieRouter = router;