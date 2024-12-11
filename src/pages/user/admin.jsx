import React from 'react';
import Sidebar from '../../components/admin/sidebar';
import Dashboard from '../../components/admin/dashboard';
import { Helmet } from 'react-helmet';

const Admin = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Helmet for SEO optimization */}
            <Helmet>
                <title>Admin Panel | Mera Bestie</title>
            </Helmet>
            {/* Sidebar for Navigation */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 bg-white shadow-md overflow-auto p-4">
                {/* Dashboard Section */}
                <div className="mt-4">
                    <Dashboard />
                </div>
            </div>
        </div>
    );
};

export default Admin;
