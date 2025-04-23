"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UnitWithOwner } from "@/types";

export const columns: ColumnDef<UnitWithOwner>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category: string = row.getValue("category");
      return <span className="capitalize">{category}</span>;
    },
  },
  {
    accessorKey: "price_per_day",
    header: "Price",
    cell: ({ row }) => {
      const price: number = row.getValue("price_per_day");
      return <span>₱{price.toLocaleString()} / Per Day</span>;
    },
  },
  {
    accessorKey: "is_available",
    header: "Availability",
    cell: ({ row }) => {
      const is_available: boolean = row.getValue("is_available");
      return (
        <span
          className={
            is_available
              ? "font-medium text-green-600"
              : "font-medium text-red-600"
          }
        >
          {is_available ? "Available" : "Unavailable"}
        </span>
      );
    },
  },
  // {
  //   accessorKey: "dateAdded",
  //   header: "Date Added",
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 cursor-pointer p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-semibold">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              View details
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Edit product
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Delete product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
