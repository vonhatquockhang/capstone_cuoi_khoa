import * as React from 'react';

const Table = ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="w-full overflow-auto">
    <table className="w-full text-sm text-left" {...props}>
      {children}
    </table>
  </div>
);

const TableHeader = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className="bg-gray-100 text-gray-700" {...props}>
    {children}
  </thead>
);

const TableBody = ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className="divide-y" {...props}>
    {children}
  </tbody>
);

const TableRow = ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className="hover:bg-gray-50" {...props}>
    {children}
  </tr>
);

const TableHead = ({ children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className="px-4 py-2 font-medium" {...props}>
    {children}
  </th>
);

const TableCell = ({ children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className="px-4 py-2" {...props}>
    {children}
  </td>
);

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
