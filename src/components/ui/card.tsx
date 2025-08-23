import React from "react";
import { cn } from "@/lib/utils"; // Hàm gộp classNames nếu bạn dùng, hoặc bỏ nếu không dùng

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("rounded-2xl border bg-white shadow-sm", className)}
      {...props}
    />
  );
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div className={cn("p-4", className)} {...props} />
  );
}
