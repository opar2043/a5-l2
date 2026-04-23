import { prisma } from "../../lib/prisma";
import type { IResult } from "./purchase.types";

const createPurchase = async (payload: IResult) => {
  const result = await prisma.purchase.create({
    data: payload,
  });
  return result;
};
const getPurchase = async () => {
  return prisma.purchase.findMany({
    include: {
      user: true,
      movie: true,
    },
  });
};

const getsinglePurchase = async (id: string) => {
  return prisma.purchase.findUnique({
    where: { id },
  });
};
const deletePurchase = async (id: string) => {
  return prisma.purchase.delete({
    where: { id },
  });
};

const updatePurchase = async (id: string, payload: any) => {
  return prisma.purchase.update({
    where: { id },
    data: payload,
  });
};

export const purchaseService = {
  createPurchase,
  getPurchase,
  getsinglePurchase,
  updatePurchase,
  deletePurchase,
};
