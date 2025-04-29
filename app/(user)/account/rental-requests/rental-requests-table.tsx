"use client";

import { useTransition, useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { RentalRequest, RentalStatus } from "@/types";
import { toast } from "sonner";
import { updateRentalStatus } from "@/actions/rentalRequestActions";
import UserInfoCard from "@/components/UserInfoCard";
import { formatCurrency } from "@/utils/currency/formatCurrency";

type RentalRequestsTableProps = {
  rentalRequests: RentalRequest[];
};

export default function RentalRequestsTable({
  rentalRequests,
}: RentalRequestsTableProps) {
  const [isPending, startTransition] = useTransition();
  const [selectedRentalId, setSelectedRentalId] = useState<string | null>(null);
  const [selectedActionType, setSelectedActionType] = useState<
    "accept" | "reject" | "complete" | null
  >(null);

  const handleUpdateStatus = async (
    rentalId: string,
    newStatus: RentalStatus,
  ) => {
    try {
      const { error } = await updateRentalStatus(rentalId, newStatus);
      if (error) {
        console.log(error);
        toast.error(error);
      } else {
        toast.success("Rental request status updated.");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update rental request status.");
    }
  };

  const handleAction = () => {
    if (!selectedRentalId || !selectedActionType) return;

    startTransition(async () => {
      await handleUpdateStatus(
        selectedRentalId,
        selectedActionType === "accept"
          ? "ongoing"
          : selectedActionType === "complete"
            ? "completed"
            : "cancelled",
      );
    });
  };

  return (
    <div className="w-full overflow-x-auto rounded-md border-t border-r border-l border-gray-100">
      <table className="min-w-full bg-white text-left text-sm">
        <thead className="border-b border-gray-100 bg-gray-50">
          <tr>
            <th className="p-3">Renter</th>
            <th className="p-3">Unit</th>
            <th className="p-3">Price Per Day</th>
            <th className="p-3">Start Date</th>
            <th className="p-3">Return Date</th>
            <th className="p-3">Total Price</th>
            <th className="p-3">Payment Method</th>
            <th className="p-3">Payment Receipt</th>
            <th className="p-3">Payment Status</th>
            <th className="p-3">Transaction Date</th>
            <th className="p-3">Rental Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rentalRequests.length === 0 ? (
            <tr>
              <td
                colSpan={12}
                className="border-b border-gray-200 p-3 text-center text-gray-500"
              >
                You have no rental requests
              </td>
            </tr>
          ) : (
            rentalRequests.map((request) => (
              <tr key={request.id} className="border-b border-gray-100">
                <td className="p-3">
                  <UserInfoCard userInfo={request.renter} />
                </td>
                <td className="p-3">{request.unit.name}</td>
                <td className="p-3">
                  {formatCurrency(request.unit.price_per_day)}
                </td>
                <td className="p-3">{request.start_date}</td>
                <td className="p-3">{request.end_date}</td>
                <td className="p-3">{formatCurrency(request.total_price)}</td>
                <td className="p-3 uppercase">{request.payment_method}</td>
                <td className="p-3">
                  {request.proof_of_payment_url ? (
                    <a
                      href={request.proof_of_payment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Receipt
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="p-3 capitalize">
                  <span
                    className={`inline-flex rounded-md px-3 py-1 text-xs font-semibold ${
                      request.payment_status === "paid"
                        ? "bg-green-100 text-green-700"
                        : request.payment_status === "unpaid"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    {request.payment_status}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(request.transaction_date).toLocaleString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </td>
                <td className="p-3 capitalize">
                  <span
                    className={`inline-flex rounded-md px-3 py-1 text-xs font-semibold ${
                      request.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : request.status === "ongoing"
                          ? "bg-blue-100 text-blue-700"
                          : request.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="space-x-2 p-3 text-right">
                  {request.status === "pending" && (
                    <>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            className="cursor-pointer rounded border border-green-100 bg-green-100 px-3 py-1 text-xs text-green-600 hover:bg-green-300"
                            disabled={isPending}
                            onClick={() => {
                              setSelectedRentalId(request.id);
                              setSelectedActionType("accept");
                            }}
                          >
                            Accept
                          </button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Accept rental request?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to accept this rental
                              request?
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="cursor-pointer"
                              onClick={handleAction}
                            >
                              Accept
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            className="cursor-pointer rounded border border-red-100 bg-red-100 px-3 py-1 text-xs text-red-600 hover:bg-red-500 hover:text-white"
                            disabled={isPending}
                            onClick={() => {
                              setSelectedRentalId(request.id);
                              setSelectedActionType("reject");
                            }}
                          >
                            Reject
                          </button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Reject rental request?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to reject this rental
                              request?
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="cursor-pointer"
                              onClick={handleAction}
                            >
                              Reject
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}

                  {request.status === "ongoing" && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="cursor-pointer rounded border border-green-100 bg-green-100 px-3 py-1 text-xs text-green-600 hover:bg-green-300 hover:text-white"
                          disabled={isPending}
                          onClick={() => {
                            setSelectedRentalId(request.id);
                            setSelectedActionType("complete");
                          }}
                        >
                          Mark as Complete
                        </button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Mark as completed?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure this rental has been completed?
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel className="cursor-pointer">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="cursor-pointer"
                            onClick={handleAction}
                          >
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
