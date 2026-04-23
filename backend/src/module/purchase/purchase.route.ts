import { Router } from "express";
import { purchasesController } from "./purchase.controller";


const router = Router();

router.post("/", purchasesController.createPurchase);
router.get("/", purchasesController.getPurchase);
router.get("/:id", purchasesController.getSinglePurchase);
router.delete("/:id", purchasesController.deletePurchase);
router.patch("/:id", purchasesController.updatePurchase);

export const purchaseRouter = router;