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
import { toast } from "sonner";
import { deleteUnit } from "@/actions/unitActions";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

// Custom component for delete confirmation
const DeleteUnitAction = ({ unitId }: { unitId: string }) => {
  const [open, setOpen] = useState(false);

  async function handleDeleteUnit() {
    const res = await deleteUnit(unitId);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Unit deleted successfully!");
      window.location.reload();
    }
  }

  return (
    <>
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
            <Link href={`/account/units/edit-unit/${unitId}`}>Edit unit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            variant="destructive"
            className="cursor-pointer"
          >
            Delete unit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Confirmation Modal */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="text-sm text-gray-500">
            This action cannot be undone. This will permanently delete the unit.
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              onClick={handleDeleteUnit}
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export const columns: ColumnDef<UnitWithOwner>[] = [
  {
    accessorKey: "unit_id",
    header: "ID",
    cell: ({ row }) => {
      const id: string = row.getValue("unit_id");
      return <span>{id}</span>;
    },
  },
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
    accessorKey: "category_name",
    header: "Category",
    cell: ({ row }) => {
      const category: string = row.getValue("category_name");
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
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt: string = row.getValue("created_at");
      return (
        <span className="capitalize">
          {new Date(createdAt).toLocaleString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const unitId = row.getValue("unit_id") as string;
      return <DeleteUnitAction unitId={unitId} />;
    },
  },
];
