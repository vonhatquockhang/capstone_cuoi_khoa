'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";

// Import các trang quản lý đã có
import UserListPage from "../UserListPage";
import JobListPage from "../jobs/JobListPage";
import BookingListPage from "../bookings/BookingListPage";
import JobTypeListPage from "../job-types/JobTypeListPage";
import ServiceListPage from "../services/ServiceListPage";
import JobDetailListPage from "../job-details/JobDetailListPage";
import ChiTietLoaiCongViecListPage from "../chi-tiet-loai-cong-viec/ChiTietLoaiCongViecListPage";
import JobsByHirerListPage from "../jobs-by-hirer/JobByHirerListPage";
import UsersByRoleListPage from "../users-by-role/UsersByRoleListPage";
import ReviewListPage from "../reviews/ReviewListPage";
import NotificationListPage from "../notifications/NotificationListPage";

const tabs = [
  { key: "users", label: "Người dùng" },
  { key: "usersByRole", label: "Người dùng theo vai trò" },
  { key: "jobs", label: "Công việc" },
  { key: "jobTypes", label: "Loại công việc" },
  { key: "jobDetails", label: "Chi tiết công việc" },
  { key: "chiTietLoaiCongViec", label: "Chi tiết loại công việc" },
  { key: "bookings", label: "Đặt lịch" },
  { key: "services", label: "Dịch vụ" },
  { key: "jobsByHirer", label: "Công việc theo người thuê" },
  { key: "reviews", label: "Đánh giá" },
  { key: "notifications", label: "Thông báo" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("users");

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UserListPage />;
      case "usersByRole":
        return <UsersByRoleListPage />;
      case "jobs":
        return <JobListPage />;
      case "jobTypes":
        return <JobTypeListPage />;
      case "jobDetails":
        return <JobDetailListPage />;
      case "chiTietLoaiCongViec":
        return <ChiTietLoaiCongViecListPage />;
      case "bookings":
        return <BookingListPage />;
      case "services":
        return <ServiceListPage />;
      case "jobsByHirer":
        return <JobsByHirerListPage />;
      case "reviews":
        return <ReviewListPage />;
      case "notifications":
        return <NotificationListPage />;
      default:
        return <div>Chọn mục quản lý</div>;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/5 p-4 border-r bg-gray-100">
        <h1 className="text-xl font-bold mb-6 text-center">Admin</h1>
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            variant={activeTab === tab.key ? "default" : "outline"}
            className="w-full mb-2 text-left"
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white">
        {renderContent()}
      </div>
    </div>
  );
}
