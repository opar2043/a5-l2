import type { PurchaseType } from "../../../generated/prisma/enums";

export interface IResult {
    id: string;
    createdAt: Date;
    movieId: string;
    purchaseType: PurchaseType;
    price: number;
    expiresAt: Date | null;
    userId: string;
}