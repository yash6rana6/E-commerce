import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const getAnalyticsData = async () => {
	try {
		const [totalUsers, totalProducts, salesData] = await Promise.all([
			User.countDocuments(),
			Product.countDocuments(),
			Order.aggregate([
				{
					$group: {
						_id: null,
						totalSales: { $sum: 1 },
						totalRevenue: { $sum: "$totalAmount" },
					},
				},
			]),
		]);

		const { totalSales = 0, totalRevenue = 0 } = salesData?.[0] || {};

		return {
			totalUsers,
			totalProducts,
			totalSales,
			totalRevenue,
		};
	} catch (err) {
		console.error("Analytics Error:", err);
		throw new Error("Failed to fetch analytics data");
	}
};

export const getDailySalesData = async (startDate, endDate) => {
	try {
		const pipeline = [
			{
				$match: {
					createdAt: {
						$gte: new Date(startDate),
						$lte: new Date(endDate),
					},
				},
			},
			{
				$group: {
					_id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
					sales: { $sum: 1 },
					revenue: { $sum: "$totalAmount" },
				},
			},
			{ $sort: { _id: 1 } },
		];

		const dailySalesData = await Order.aggregate(pipeline);

		const dateArray = getDatesInRange(startDate, endDate);

		return dateArray.map(date => {
			const found = dailySalesData.find(x => x._id === date);
			return {
				date,
				sales: found?.sales || 0,
				revenue: found?.revenue || 0,
			};
		});
	} catch (err) {
		console.error("Daily Sales Error:", err);
		throw new Error("Failed to fetch daily sales data");
	}
};

function getDatesInRange(startDate, endDate) {
	const arr = [];
	let current = new Date(startDate);

	while (current <= endDate) {
		arr.push(current.toISOString().split("T")[0]);
		current.setDate(current.getDate() + 1);
	}

	return arr;
}
