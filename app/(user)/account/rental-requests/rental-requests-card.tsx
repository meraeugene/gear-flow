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
import { capitalizeFirstLetter } from "@/utils/string/capitalizeFirstLetter";

type RentalRequestsTableProps = {
  rentalRequests: RentalRequest[];
};

export default function RentalRequestsCard({
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
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
      {rentalRequests.length === 0 ? (
        <div className="col-span-full rounded-md border border-gray-200 p-4 text-center text-gray-500">
          You have no rental requests
        </div>
      ) : (
        rentalRequests.map((request) => (
          <div
            key={request.id}
            className="flex cursor-pointer flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-lg"
          >
            <div className="flex flex-col items-center justify-center gap-3">
              <UserInfoCard userInfo={request.renter} className="h-21 w-21" />

              <h1 className="text-xl font-semibold">
                {capitalizeFirstLetter(request.renter.first_name)}{" "}
                {capitalizeFirstLetter(request.renter.last_name)}
              </h1>

              <div className="flex flex-col items-center justify-center">
                <h1>Transaction Date</h1>{" "}
                {new Date(request.transaction_date).toLocaleString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </div>
            </div>

            <h1 className="my-6 text-center font-semibold">
              {request.unit.name}
            </h1>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h2>Price/Day:</h2>{" "}
                <span className="font-semibold">
                  {formatCurrency(request.unit.price_per_day)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <h2>Start Date:</h2>{" "}
                <span className="font-semibold">{request.start_date}</span>
              </div>

              <div className="flex items-center justify-between">
                <h2>Return Date:</h2>{" "}
                <span className="font-semibold">{request.end_date}</span>
              </div>

              <div className="flex items-center justify-between">
                <h2>Total Price:</h2>{" "}
                <span className="font-semibold">
                  {" "}
                  {formatCurrency(request.total_price)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <h2>Payment Method:</h2>{" "}
                <span className="font-semibold">
                  {" "}
                  {request.payment_method.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <h2>Payment Receipt:</h2>
                <span className="font-semibold">
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
                </span>
              </div>

              <div className="flex items-center justify-between">
                <h2>Payment Status:</h2>{" "}
                <span
                  className={`inline-block rounded-md px-2 py-1 text-xs font-semibold uppercase ${
                    request.payment_status === "paid"
                      ? "bg-green-100 text-green-700"
                      : request.payment_status === "unpaid"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-600"
                  }`}
                >
                  {request.payment_status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <h2>Rental Status:</h2>{" "}
                <span
                  className={`inline-block rounded-md px-2 py-1 text-xs font-semibold uppercase ${
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
                </span>{" "}
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                {request.status === "pending" && (
                  <>
                    {/* Accept Button */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="w-full cursor-pointer rounded border border-green-100 bg-green-100 px-3 py-2 text-xs text-green-600 hover:bg-green-400 hover:text-white"
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
                            Are you sure you want to accept this rental request?
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

                    {/* Reject Button */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="w-full cursor-pointer rounded border border-red-100 bg-red-100 px-3 py-2 text-xs text-red-600 hover:bg-red-400 hover:text-white"
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
                            Are you sure you want to reject this rental request?
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
                        className="w-full cursor-pointer rounded border border-green-100 bg-green-100 px-3 py-2 text-xs text-green-600 hover:bg-green-400 hover:text-white"
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
                        <AlertDialogTitle>Mark as completed?</AlertDialogTitle>
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
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
