"use client";

import { useState } from "react";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import { Truck, Package, Wallet2, HandCoins } from "lucide-react";
import { toast } from "sonner";
import { UnitWithOwner, UserMetadata } from "@/types";
import { calculateTotal } from "@/utils/calculateRental";
import { getArrivalDate } from "@/utils/getArrivalDate";
import { getReturnDate } from "@/utils/getReturnDate";

interface UnitCheckoutClientProps {
  user: UserMetadata;
  unit: UnitWithOwner;
}

export default function UnitCheckoutClient({
  user,
  unit,
}: UnitCheckoutClientProps) {
  const [deliveryMethod, setDeliveryMethod] = useState("deliver");
  const [paymentMethod, setPaymentMethod] = useState("ewallet");
  const [daysOfRent, setDaysOfRent] = useState(1);

  const deliveryFee = deliveryMethod === "deliver" ? 125 : 0;
  const total = calculateTotal(unit.price_per_day, daysOfRent, deliveryFee);

  const handleCheckout = () => {
    if (daysOfRent < 1) {
      toast.error("Days of rent must be at least 1.");
      return;
    }

    const orderDetails = {
      fullName: `${user?.first_name || ""} ${user?.last_name || ""}`,
      address: user?.address,
      email: user?.email,
      phone: user?.phone_number,
      daysOfRent,
      deliveryMethod,
      paymentMethod,
      unitId: unit.id,
      subtotal: unit.price_per_day,
      total,
    };

    console.log("🧾 Order Details:", orderDetails);
    // Call your API or navigate here
  };

  return (
    <main className="mx-auto max-w-[85rem] px-24 pt-18 pb-28">
      <div className="flex space-y-6">
        {/* Fill up Section */}
        <div className="mb-0 flex w-full flex-col gap-10 border-r pr-18">
          <div className="space-y-4">
            <h1 className="mb-4 text-lg font-semibold">
              Enter your personal information
            </h1>

            {[
              {
                label: "Full Name",
                id: "fullName",
                type: "text",
                value: `${user?.first_name || ""} ${user?.last_name || ""}`,
              },
              {
                label: "Address",
                id: "address",
                type: "text",
                value: user?.address,
              },
              {
                label: "Email",
                id: "email",
                type: "email",
                value: user?.email,
              },
              {
                label: "Phone Number",
                id: "phone",
                type: "text",
                value: user?.phone_number,
              },
            ].map(({ label, id, type, value }) => (
              <div key={id} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  id={id}
                  type={type}
                  defaultValue={value}
                  className="w-full rounded-md border px-4 py-3"
                />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h1 className="mb-4 text-lg font-semibold">
              How many days will you rent this unit?
            </h1>

            <div>
              <input
                type="number"
                min={1}
                value={daysOfRent}
                onChange={(e) => {
                  const value = Math.max(1, Number(e.target.value));
                  setDaysOfRent(value);
                }}
                className="w-full rounded-md border px-4 py-3"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="mb-4 text-lg font-semibold">
              How would you like to get your unit?
            </h1>
            <button
              onClick={() => setDeliveryMethod("deliver")}
              className={`flex h-[60px] w-full cursor-pointer items-center gap-3 rounded-md border px-6 text-lg ${
                deliveryMethod === "deliver"
                  ? "bg-black text-white"
                  : "hover:bg-black hover:text-white"
              }`}
            >
              <Truck className="h-5 w-5 font-semibold text-gray-400" /> Deliver
              It
            </button>
            <button
              onClick={() => setDeliveryMethod("pickup")}
              className={`flex h-[60px] w-full cursor-pointer items-center gap-3 rounded-md border px-6 text-lg ${
                deliveryMethod === "pickup"
                  ? "bg-black text-white"
                  : "hover:bg-black hover:text-white"
              }`}
            >
              <Package className="h-5 w-5 text-gray-400" /> Pick It Up
            </button>
          </div>

          <div className="space-y-4">
            <h1 className="mb-4 text-lg font-semibold">
              How would you like to pay?
            </h1>
            <button
              onClick={() => setPaymentMethod("ewallet")}
              className={`flex h-[55px] w-full cursor-pointer items-center gap-3 rounded-md border px-6 text-lg ${
                paymentMethod === "ewallet"
                  ? "bg-black text-white"
                  : "transition-all ease-in hover:bg-black hover:text-white"
              }`}
            >
              <Wallet2 className="h-5 w-5 text-gray-400" /> Gcash
            </button>
            <button
              onClick={() => setPaymentMethod("cod")}
              className={`flex h-[55px] w-full cursor-pointer items-center gap-3 rounded-md border px-6 text-lg ${
                paymentMethod === "cod"
                  ? "bg-black text-white"
                  : "transition-all ease-in hover:bg-black hover:text-white"
              }`}
            >
              <HandCoins className="h-5 w-5 text-gray-400" /> Cash On Delivery
            </button>
          </div>
        </div>

        {/* Summary Section */}
        <div className="sticky top-26 flex w-full flex-col self-start pl-18">
          <div className="flex flex-col items-center justify-center gap-2">
            <Image
              src={unit.image_url}
              alt={unit.name}
              height={1080}
              width={1980}
              objectFit="cover"
              className="w-[20rem] rounded-lg object-center"
            />
            <h1 className="text-2xl font-medium">{unit.name}</h1>
          </div>

          <div className="mt-6 w-full space-y-2">
            <h1 className="mb-6 text-2xl font-semibold">Order Summary</h1>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg text-gray-500">Subtotal</h2>
                <span className="text-xl">
                  {formatCurrency(unit.price_per_day)} / Per Day
                </span>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-lg text-gray-500">Days of Rent</h2>
                <span className="text-xl">{daysOfRent}</span>
              </div>

              <div className="mb-0 flex items-center justify-between">
                <h2 className="text-lg text-gray-500">Delivery Fee</h2>
                <span className="text-xl">
                  {deliveryFee > 0 ? formatCurrency(deliveryFee) : "Free"}
                </span>
              </div>

              <div className="mt-6 mb-0 flex items-center justify-between border-t pt-6">
                <h2 className="text-xl font-semibold">Total</h2>
                <span className="text-xl">{formatCurrency(total)}</span>
              </div>

              <button
                disabled={!unit.is_available}
                onClick={handleCheckout}
                className="my-10 h-[55px] w-full cursor-pointer rounded-md border border-gray-400 text-lg font-semibold hover:bg-gray-50"
              >
                Check Out
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="arrival-date__container flex items-center justify-between">
              <h1 className="text-xl font-semibold">Arival Date</h1>
              <span className="text-lg font-semibold text-gray-600">
                {getArrivalDate()}
              </span>
            </div>

            <div className="return-date__container flex items-center justify-between">
              <h1 className="text-xl font-semibold">Return Date</h1>
              <span className="text-lg font-semibold text-gray-600">
                {getReturnDate(daysOfRent)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
