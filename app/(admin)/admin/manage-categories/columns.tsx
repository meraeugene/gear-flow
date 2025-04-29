"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "@/types";
import Image from "next/image";
import { toast } from "sonner";
import { deleteCategory } from "@/actions/categoryActions";
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
import { ColumnDef } from "@tanstack/react-table";

// Modal for confirmation
function CategoryActions({ categoryId }: { categoryId: string }) {
  const [open, setOpen] = useState(false);

  const handleDeleteCategory = async () => {
    const res = await deleteCategory(categoryId);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Category deleted successfully!");
      window.location.reload();
    }
  };

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
            <Link href={`/admin/manage-categories/edit-category/${categoryId}`}>
              Edit category
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            variant="destructive"
            className="cursor-pointer"
          >
            Delete category
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
            This action cannot be undone. This will permanently delete the
            category.
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              onClick={handleDeleteCategory}
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

// Columns definition
export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span>{row.getValue("id")}</span>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        className="cursor-pointer"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "image_url",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl: string = row.getValue("image_url");
      return (
        <div>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Category Image"
              width={50}
              height={50}
              className="rounded-md object-cover"
            />
          ) : (
            <span className="text-gray-400 italic">No image</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("description")}</span>
    ),
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
      const categoryId = row.getValue("id") as string;
      return <CategoryActions categoryId={categoryId} />;
    },
  },
];
