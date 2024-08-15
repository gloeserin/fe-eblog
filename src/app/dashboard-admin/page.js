"use client";

import { useRouter } from 'next/navigation';
import { useState, useRef } from "react"; // Import useRef here
import AdminLayout from '../layouts/dashboard-admin';
import WelcomeBanner from '../components/WelcomeBanner';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  

  return (
    <AdminLayout>
      <WelcomeBanner />
    </AdminLayout>
  );
}

export default Dashboard;
