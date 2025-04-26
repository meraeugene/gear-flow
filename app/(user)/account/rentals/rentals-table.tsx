"use client";

import UserInfoCard from "@/components/UserInfoCard";
import { RentalData } from "@/types";

type Props = {
  rentals: RentalData[];
};

export default function RentalsTable({ rentals }: Props) {
  return (
    <div className="w-full overflow-x-auto rounded-md border-t border-r border-l border-gray-200">
      <table className="min-w-full bg-white text-left text-sm">
        <thead className="border-b border-gray-200 hover:bg-gray-50">
          <tr>
            <th className="p-3">Unit</th>
            <th className="p-3">Owner</th>
            <th className="p-3">Start Date</th>
            <th className="p-3">End Date</th>
            <th className="p-3">Delivery Method</th>
            <th className="p-3">Status</th>
            <th className="p-3">Total Price</th>
            <th className="p-3">Rented On</th>
          </tr>
        </thead>
        <tbody>
          {rentals.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="border-b border-gray-200 p-3 text-center text-gray-500"
              >
                You have no active rentals .
              </td>
            </tr>
          ) : (
            rentals.map((rental) => (
              <tr
                key={rental.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-3">{rental.unit?.name ?? "Unknown Unit"}</td>
                <td className="p-3">
                  <UserInfoCard userInfo={rental.owner} />
                </td>
                <td className="p-3">{rental.start_date}</td>
                <td className="p-3">{rental.end_date}</td>
                <td className="p-3 capitalize">{rental.delivery_method}</td>
                <td className="p-3 capitalize">
                  <span
                    className={`inline-flex rounded-md px-3 py-1 text-xs font-semibold ${
                      rental.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : rental.status === "ongoing"
                          ? "bg-blue-100 text-blue-700"
                          : rental.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                    }`}
                  >
                    {rental.status}
                  </span>
                </td>
                <td className="p-3">₱{rental.total_price.toLocaleString()}</td>
                <td className="p-3">
                  {new Date(rental.created_at).toLocaleString("en-US", {
                    weekday: "short", // optional for day abbreviation (e.g., Mon)
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true, // AM/PM time format
                  })}{" "}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
