"use client";

import { JobItem } from "@/domain/models/job.model";
import { JobCategoryGroup } from "@/domain/models/jobcategory.model";
import { JobService } from "@/domain/service/jobservice";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 6;

export default function JobListPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const keyword = searchParams.get("keyword") || "";
  const maChiTietLoai = searchParams.get("maChiTietLoai");

  const [searchInput, setSearchInput] = useState(keyword);
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<JobCategoryGroup[]>([]);

  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = jobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    JobService.getJobCategories()
      .then((res) => setCategories(res.content))
      .catch((err) => console.error("Fetch categories failed:", err));
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (maChiTietLoai) {
        JobService.getJobsByDetailCategory(maChiTietLoai)
          .then((res) => {
            setJobs(res.content || []);
            setCurrentPage(1);
          })
          .catch(() => setJobs([]));
      } else if (searchInput.trim()) {
        JobService.getJobsByKeyword(searchInput)
          .then((res) => {
            setJobs(res.content || []);
            setCurrentPage(1);
          })
          .catch(() => setJobs([]));
      } else {
        setJobs([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchInput, maChiTietLoai]);

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-bold mb-4">Search Jobs</h1>

      {/* Search bar */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter keyword..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 px-4 py-2 border rounded"
        />
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-4 mb-10">
        {[
          "Category",
          "Service Options",
          "Seller Details",
          "Budget",
          "Delivery Time",
        ].map((label) => (
          <button
            key={label}
            className="px-4 py-2 border border-gray-300 rounded text-sm bg-white hover:bg-gray-50"
          >
            {label} ▾
          </button>
        ))}

        <div className="flex items-center gap-4 ml-auto flex-wrap">
          {["Pro services", "Local sellers", "Online sellers"].map((label) => (
            <label
              key={label}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <input type="checkbox" className="accent-green-600 w-4 h-4" />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Mobile sidebar button */}
      <div className="lg:hidden flex justify-end mb-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="px-4 py-2 border border-gray-300 rounded text-sm bg-white hover:bg-gray-50"
        >
          ☰ Filters
        </button>
      </div>

      {/* Sidebar overlay for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-end lg:hidden">
          <div className="w-64 h-full bg-white p-4 overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-600 hover:text-black text-xl"
              >
                &times;
              </button>
            </div>
            {categories.map((group) => (
              <div key={group.tenLoaiCongViec}>
                <h2 className="font-bold text-base text-neutral-800 mb-3 border-b pb-1">
                  {group.tenLoaiCongViec}
                </h2>
                {group.dsNhomChiTietLoai.map((nhom) => (
                  <div key={nhom.tenNhom} className="mb-3">
                    <h3 className="text-sm text-neutral-500 font-medium mb-1">
                      {nhom.tenNhom}
                    </h3>
                    <ul className="space-y-1 pl-2 border-l border-gray-200">
                      {nhom.dsChiTietLoai.map((ct) => (
                        <li
                          key={ct.id}
                          className="text-sm text-emerald-600 hover:text-emerald-800 hover:underline cursor-pointer transition"
                          onClick={() => {
                            router.push(`/cong-viec?maChiTietLoai=${ct.id}`);
                            setIsSidebarOpen(false);
                          }}
                        >
                          {ct.tenChiTiet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 space-y-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          {categories.map((group) => (
            <div key={group.tenLoaiCongViec}>
              <h2 className="font-bold text-base text-neutral-800 mb-3 border-b pb-1">
                {group.tenLoaiCongViec}
              </h2>
              {group.dsNhomChiTietLoai.map((nhom) => (
                <div key={nhom.tenNhom} className="mb-3">
                  <h3 className="text-sm text-neutral-500 font-medium mb-1">
                    {nhom.tenNhom}
                  </h3>
                  <ul className="space-y-1 pl-2 border-l border-gray-200">
                    {nhom.dsChiTietLoai.map((ct) => (
                      <li
                        key={ct.id}
                        className="text-sm text-emerald-600 hover:text-emerald-800 hover:underline cursor-pointer transition"
                        onClick={() =>
                          router.push(`/cong-viec?maChiTietLoai=${ct.id}`)
                        }
                      >
                        {ct.tenChiTiet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </aside>

        {/* Job list */}
        <div className="flex-1">
          {/* <h2 className="text-xl font-semibold mb-4">
            Results for:{" "}
            <span className="text-green-700">
              {maChiTietLoai
                ? `Category ID = ${maChiTietLoai}`
                : searchInput || "All Jobs"}
            </span>
          </h2> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {paginatedJobs.map((job) => (
              <div
                key={job.id}
                className="border p-4 rounded shadow hover:shadow-md"
              >
                <img
                  src={job.congViec.hinhAnh}
                  alt={job.congViec.tenCongViec}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h2 className="text-lg font-semibold">
                  {job.congViec.tenCongViec}
                </h2>
                <p className="text-sm text-gray-600">{job.tenChiTietLoai}</p>
                <p className="text-green-600 font-bold mt-2">
                  ${job.congViec.giaTien}
                </p>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {currentPage} / {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
