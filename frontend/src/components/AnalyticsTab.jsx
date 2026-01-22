import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AnalyticsTab = () => {
    const [analyticsData, setAnalyticsData] = useState({
        users: 0,
        products: 0,
        totalSales: 0,
        totalRevenue: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [dailySalesData, setDailySalesData] = useState([]);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const response = await axios.get("/analytics");
                setAnalyticsData(response.data.analyticsData);
                setDailySalesData(response.data.dailySalesData);
            } catch (error) {
                console.error("Error fetching analytics data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAnalyticsData();
    }, []);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen text-stone-500 italic animate-pulse">Gathering Intelligence...</div>;
    }

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen transition-colors duration-500'>
            {/* Top Stat Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                <AnalyticsCard
                    title='Total Users'
                    value={analyticsData.users.toLocaleString()}
                    icon={Users}
                />
                <AnalyticsCard
                    title='Total Products'
                    value={analyticsData.products.toLocaleString()}
                    icon={Package}
                />
                <AnalyticsCard
                    title='Total Sales'
                    value={analyticsData.totalSales.toLocaleString()}
                    icon={ShoppingCart}
                />
                <AnalyticsCard
                    title='Total Revenue'
                    value={`$${analyticsData.totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                />
            </div>

            {/* Performance Chart Section */}
            <motion.div
                className='bg-white dark:bg-[#141413] rounded-sm p-8 border border-stone-200 dark:border-stone-800 shadow-xl'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-stone-900 dark:text-stone-100 font-serif text-xl italic">Commercial Performance</h3>
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Real-time Data</span>
                </div>
                
                <ResponsiveContainer width='100%' height={400}>
                    <LineChart data={dailySalesData}>
                        <CartesianGrid strokeDasharray='3 3' stroke="rgba(120, 113, 108, 0.1)" vertical={false} />
                        <XAxis 
                            dataKey='name' 
                            stroke='#78716C' 
                            fontSize={11} 
                            tickLine={false} 
                            axisLine={false} 
                            tick={{ dy: 10 }}
                        />
                        <YAxis 
                            yAxisId='left' 
                            stroke='#78716C' 
                            fontSize={11} 
                            tickLine={false} 
                            axisLine={false} 
                        />
                        <YAxis 
                            yAxisId='right' 
                            orientation='right' 
                            stroke='#78716C' 
                            fontSize={11} 
                            tickLine={false} 
                            axisLine={false} 
                        />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: 'rgba(20, 20, 19, 0.95)', 
                                borderRadius: '0px', 
                                border: '1px solid #D4AF37',
                                color: '#fff' 
                            }}
                            itemStyle={{ color: '#F5F5F5', fontSize: '12px' }}
                        />
                        <Legend verticalAlign="top" height={36} iconType="diamond"/>
                        <Line
                            yAxisId='left'
                            type='monotone'
                            dataKey='sales'
                            stroke='#D4AF37' // Gold line
                            strokeWidth={2}
                            dot={{ r: 2, fill: '#D4AF37' }}
                            activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }}
                            name='Total Sales'
                        />
                        <Line
                            yAxisId='right'
                            type='monotone'
                            dataKey='revenue'
                            stroke='#78716C' // Stone/Grey line
                            strokeWidth={2}
                            dot={{ r: 2, fill: '#78716C' }}
                            activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }}
                            name='Revenue ($)'
                        />
                    </LineChart>
                </ResponsiveContainer>
            </motion.div>
        </div>
    );
};

const AnalyticsCard = ({ title, value, icon: Icon }) => (
    <motion.div
        className='bg-white dark:bg-[#141413] border border-stone-200 dark:border-stone-800 rounded-sm p-6 shadow-lg overflow-hidden relative group'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ borderColor: '#D4AF37', transition: { duration: 0.3 } }}
    >
        <div className='flex justify-between items-center relative z-10'>
            <div>
                <p className='text-stone-500 dark:text-stone-400 text-[10px] uppercase tracking-[0.2em] mb-1 font-bold'>{title}</p>
                <h3 className='text-stone-900 dark:text-stone-100 text-3xl font-serif font-light tracking-tight'>{value}</h3>
            </div>
            <div className='p-3 bg-stone-50 dark:bg-stone-900/50 rounded-sm text-[#D4AF37] border border-stone-100 dark:border-stone-800 group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-500'>
                <Icon size={20} />
            </div>
        </div>
        
        {/* Subtle Watermark Icon */}
        <div className='absolute -bottom-4 -right-4 text-stone-100/50 dark:text-stone-800/20 group-hover:scale-110 transition-transform duration-700 pointer-events-none'>
            <Icon size={120} strokeWidth={0.5} />
        </div>
    </motion.div>
);

export default AnalyticsTab;