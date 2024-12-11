import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/sidebar';
import Dashboard from './dashboard';
import Orders from './Orders';
import { Helmet } from "react-helmet";

const AdminDashboardContainer = () => {
    const [orders, setOrders] = useState([]);

    // Fetch orders data
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('https://ecommercebackend-8gx8.onrender.com/get-orders');
                const data = await response.json();
                setOrders(data.orders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const totalOrders = orders.length; // Dynamically calculate total orders

    return (
        <div className="flex">
            <Helmet>
                <title>Admin Panel | Mera Bestie</title>
            </Helmet>
            <Sidebar />
            <div className="flex-1 p-8 ml-[5rem] lg:ml-64 bg-pink-50 min-h-screen">
                {/* Pass dynamic totalOrders to Dashboard */}
                <Dashboard totalOrders={totalOrders} />

                {/* Pass fetched orders to Orders */}
                <Orders orders={orders} />
            </div>
        </div>
    );
};

export default AdminDashboardContainer;
