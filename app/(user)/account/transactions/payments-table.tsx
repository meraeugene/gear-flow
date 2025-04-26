"use client";

import UserInfoCard from "@/components/UserInfoCard";
import { TransactionData } from "@/types";

type Props = {
  transactions: TransactionData[];
};

export default function PaymentsTable({ transactions }: Props) {
  return (
    <div className="w-full overflow-x-auto rounded-md border-t border-r border-l border-gray-200">
      <table className="min-w-full bg-white text-left text-sm">
        <thead className="border-b border-gray-200 hover:bg-gray-50">
          <tr>
            <th className="p-3">Unit</th>
            <th className="p-3">Owner</th>
            <th className="p-3">Total Price</th>
            <th className="p-3">Payment Method</th>
            <th className="p-3">Payment Receipt</th>
            <th className="p-3">Status</th>
            <th className="p-3">Transaction Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="border-b border-gray-200 p-3 text-center text-gray-500"
              >
                You have no payment transactions.
              </td>
            </tr>
          ) : (
            transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-3">
                  {transaction.unit?.name ?? "Unknown Unit"}
                </td>
                <td className="p-3">
                  <UserInfoCard userInfo={transaction.owner} />
                </td>
                <td className="p-3">₱{transaction.amount.toLocaleString()}</td>
                <td className="p-3 uppercase">{transaction.payment_method}</td>
                <td className="p-3">
                  {transaction.proof_of_payment_url ? (
                    <a
                      href={transaction.proof_of_payment_url}
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
                      transaction.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : transaction.status === "unpaid"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(transaction.transaction_date).toLocaleString(
                    "en-US",
                    {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    },
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
