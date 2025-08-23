"use client";

import React, { useEffect, useState } from "react";
import { getJobsByHirer } from "@/application/service/JobsByHirer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function JobsByHirerListPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobsByHirer().then(setJobs);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Jobs by Hirer</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hirer Name</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job: any) => (
            <TableRow key={job.id}>
              <TableCell>{job.hirerName}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.startDate}</TableCell>
              <TableCell>{job.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
