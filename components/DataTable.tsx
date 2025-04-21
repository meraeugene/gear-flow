import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";

export function DataTable({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="mt-6 rounded-lg border border-gray-200 p-8 text-center">
        <p className="text-gray-600">
          No units found. Add your first rental unit to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-14">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((unit) => (
              <TableRow key={unit.unit_id}>
                <TableCell>
                  <div className="h-10 w-10 overflow-hidden rounded-md">
                    {unit.image ? (
                      <Image
                        src={unit.image}
                        alt={unit.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-500">
                        No img
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{unit.name}</TableCell>
                <TableCell>{unit.category?.name || "Uncategorized"}</TableCell>
                <TableCell className="max-w-xs truncate">
                  {unit.description || "No description"}
                </TableCell>
                <TableCell className="text-right">
                  {typeof unit.price === "number"
                    ? formatCurrency(unit.price)
                    : "—"}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      unit.availability === "available"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {unit.availability || "unavailable"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
