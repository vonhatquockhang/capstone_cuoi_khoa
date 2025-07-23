import JobListPage from "@/components/jobs/JobListClient";
import { Suspense } from "react";

export default function CongViecPage() {
  return (
    <Suspense fallback={<div>Loading jobs...</div>}>
      <JobListPage />
    </Suspense>
  );
}
