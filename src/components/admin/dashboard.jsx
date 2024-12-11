import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    // // Static data for visualization
    // const orderData = [
    //     { name: 'Completed', value: 75 },
    //     { name: 'Pending', value: 25 },
    // ];
    // const revenueData = [
    //     { name: 'Profit', value: 65 },
    //     { name: 'Cost', value: 35 },
    // ];
    // const growthData = [
    //     { name: 'Growth', value: 82 },
    //     { name: 'Target', value: 18 },
    // ];

    const [totalOrders, setTotalOrders] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalComplaints, setTotalComplaints] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);

    const [revenueData, setRevenueData] = useState([]); // Dynamically computed revenue data

    useEffect(() => {
        fetchTotalOrders();
        fetchTotalProducts();
        fetchTotalComplaints();
    }, []);

    const fetchTotalOrders = async () => {
        try {
            const response = await fetch('https://ecommercebackend-8gx8.onrender.com/get-orders');
            const data = await response.json();
            if (data && Array.isArray(data.orders)) {
                setTotalOrders(data.orders.length);

                // Dynamically compute revenue
                const revenue = data.orders.reduce((sum, order) => sum + parseFloat(order.price || 0), 0);
                setTotalRevenue(revenue);

                // Set pie chart data dynamically
                setRevenueData([
                    { name: 'Profit', value: revenue * 0.7 }, // Assuming 70% of revenue is profit
                    { name: 'Cost', value: revenue * 0.3 }, // Assuming 30% of revenue is cost
                ]);
            }
        } catch (error) {
            console.error('Error fetching total orders:', error);
        }
    };
    const fetchTotalProducts = async () => {
        try {
            const response = await fetch('https://ecommercebackend-8gx8.onrender.com/get-product');
            const data = await response.json();
            if (data && Array.isArray(data.products)) {
                setTotalProducts(data.products.length);
            }
        } catch (error) {
            console.error('Error fetching total products:', error);
        }
    };
    const fetchTotalComplaints = async () => {
        try {
            const response = await fetch('https://ecommercebackend-8gx8.onrender.com/get-complaints');
            const data = await response.json();
            if (data && Array.isArray(data.complaints)) {
                setTotalComplaints(data.complaints.length);
            }
        } catch (error) {
            console.error('Error fetching total complaints:', error);
        }
    };

    //  Dynamically calculate total revenue from all order prices
    // const calculateTotalRevenue = (orders) => {
    //     const revenue = orders.reduce((sum, order) => sum + parseFloat(order.price || 0), 0); // Summing up the prices
    //     setTotalRevenue(revenue);
    // };

    const COLORS = ['#FF8042', '#FFBB28'];

    return (
        <div className="p-6 bg-pink-100 transition-all duration-300 ml-[5rem] lg:ml-64">
            {/* Header Section */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-600 mt-1 text-sm">Welcome to Mera Bestie Admin Panel!</p>
            </div>

            {/* Statistics Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { title: 'Total Orders', value: totalOrders, percent: '+12%' },
                    { title: 'Total Complaints', value: totalComplaints, percent: '+8%' },
                    {
                        title: 'Revenue Generated', value: `₹${totalRevenue.toFixed(2)}`, percent: '+15%'
                    },
                    { title: 'Total Products', value: totalProducts, percent: '+5%' },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow ease-in-out"
                    >
                        <h2 className="text-sm font-semibold text-gray-600 mb-2">{item.title}</h2>
                        <p className="text-2xl font-bold text-pink-600">{item.value}</p>
                        <p className="text-sm text-gray-500 mt-2">{item.percent}</p>
                    </div>
                ))}
            </div>

            {/* Chart Visualization Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Orders Status */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-2 text-gray-700">Order Status</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={revenueData}
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {revenueData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-gray-800 text-lg font-semibold">Completion Rate</p>
                        <p className="text-pink-600 text-3xl mt-1">75%</p>
                    </div>
                </div>

                {/* Revenue Analytics */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-2 text-gray-700">Revenue Analytics</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={revenueData}
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {revenueData.map((entry, index) => (
                                        <Cell key={`cell - ${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-gray-800 text-lg font-semibold">Profit Margin</p>
                        <p className="text-pink-600 text-3xl mt-1">65%</p>
                    </div>
                </div>

                {/* Customer Growth Analytics */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-2 text-gray-700">Customer Growth</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={revenueData}
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {revenueData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-gray-800 text-lg font-semibold">Growth Rate</p>
                        <p className="text-pink-600 text-3xl mt-1">82%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
