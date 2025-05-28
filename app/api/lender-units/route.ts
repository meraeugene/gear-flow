import { NextResponse } from "next/server";
import { getLenderUnitsWithProfile } from "@/actions/lenderActions";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const lenderId = url.searchParams.get("lenderId");
  const page = parseInt(url.searchParams.get("page") || "1");
  const itemsPerPage = parseInt(url.searchParams.get("limit") || "6");

  if (!lenderId) {
    return NextResponse.json({ error: "Missing lenderId" }, { status: 400 });
  }

  const { userUnits, totalUnitsCount, error } = await getLenderUnitsWithProfile(
    lenderId,
    page,
    itemsPerPage,
  );

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({
    units: userUnits,
    totalUnitsCount,
  });
}
