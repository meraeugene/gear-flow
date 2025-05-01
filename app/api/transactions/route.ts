import { NextResponse } from "next/server";
import { getUserTransaction } from "@/actions/transactionActions";

export const GET = async () => {
  try {
    const transactions = await getUserTransaction();

    if (transactions.error) {
      return NextResponse.json(
        { error: "Failed to transactions." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      transactions: transactions.data,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 },
    );
  }
};
