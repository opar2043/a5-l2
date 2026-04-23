import type {  Request , Response } from "express";
import { prisma } from "../../lib/prisma";

export const statsController  = {
  getAdminStats: async (req: Request, res: Response): Promise<void> => {
    try {
      const [totalMovies, totalUsers, totalPurchases] = await Promise.all([
        prisma.movie.count(),
        prisma.user.count(),
        prisma.purchase.count()
      ]);

      const aggregation = await prisma.purchase.aggregate({
        _sum: {
          price: true
        }
      });

      const totalRevenue = aggregation._sum.price || 0;

      res.status(200).json({
        success: true,
        data: {
          totalMovies,
          totalUsers,
          totalPurchases,
          totalRevenue
        }
      });
    } catch (error: any) {
      console.error("Dashboard stats error:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
};
