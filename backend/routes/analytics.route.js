import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { getAnalyticsData, getDailySalesData } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, async (req, res) => {
	try {
		const [
			analyticsData,
			dailySalesData
		] = await Promise.all([
			getAnalyticsData(),
			getDailySalesData(
				new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
				new Date()
			)
		]);

		return res.status(200).json({
			success: true,
			data: {
				analytics: analyticsData,
				daily: dailySalesData,
			},
		});
	} catch (err) {
		console.error("Analytics Route Error:", err.message);
		return res.status(500).json({
			success: false,
			message: "Failed to load analytics",
			error: err.message,
		});
	}
});

export default router;
