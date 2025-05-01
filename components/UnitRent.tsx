"use client";

import { useState } from "react";
import Image from "next/image";
import { formatCurrency } from "@/utils/currency/formatCurrency";
import { Truck, Package, Wallet2, HandCoins } from "lucide-react";
import { toast } from "sonner";
import { UnitWithOwner, User } from "@/types";
import { calculateTotal } from "@/lib/rentals/calculateRental";
import { getArrivalDate } from "@/lib/rentals/getArrivalDate";
import { getReturnDate } from "@/lib/rentals/getReturnDate";
import BackButton from "./BackButton";
import BreadcrumbNav from "./BreadcrumbNav";
import { generateSlug } from "@/utils/string/generateSlug";
import GcashPayment from "./GcashPayment";
import { motion } from "framer-motion";
import { cloudinaryUploadImage } from "@/lib/services/cloudinaryUploadImage";
import Loader from "./Loader";
import { createRentalAndTransaction } from "@/actions/checkoutActions";
import { useRouter } from "next/navigation";

interface UnitCheckoutClientProps {
  user: User;
  unit: UnitWithOwner;
}

export default function UnitRent({ user, unit }: UnitCheckoutClientProps) {
  const router = useRouter();

  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [daysOfRent, setDaysOfRent] = useState(1);
  const [proofOfPayment, setProofOfPayment] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const deliveryFee = deliveryMethod === "delivery" ? 125 : 0;
  const total = calculateTotal(unit.price_per_day, daysOfRent, deliveryFee);

  const startDate = getArrivalDate();
  const endDate = getReturnDate(daysOfRent);

  const breadcrumbs = [
    { title: "Home", href: "/" },
    { title: "Units", href: "/units" },
    {
      title: unit.name,
      href: `/units/${unit.unit_id}/${generateSlug(unit.name)}/${unit.category_id}`,
    },
    {
      title: "Rent",
      href: `/rent/${unit.unit_id}/${generateSlug(unit.name)}`,
    },
  ];

  const handleCheckout = async () => {
    if (paymentMethod === "gcash" && !proofOfPayment) {
      return toast.error("Please upload proof of payment.");
    }

    setIsLoading(true);

    try {
      const proofUrl =
        paymentMethod === "gcash"
          ? await cloudinaryUploadImage(proofOfPayment!)
          : "";

      const result = await createRentalAndTransaction({
        unitId: unit.unit_id,
        startDate,
        endDate,
        deliveryMethod,
        totalPrice: total,
        paymentMethod,
        proofUrl,
      });

      if (result?.error) {
        toast.error(result.error);
        return setIsLoading(false);
      }

      if (result?.success) {
        toast.success(result.success);
        setIsLoading(false);
        router.push(result.redirectUrl);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="space-y-7 px-24 pt-12">
        <BackButton />
        <BreadcrumbNav items={breadcrumbs} />
      </div>

      <main className="mx-auto max-w-[85rem] px-24 pt-14 pb-28">
        <div className="flex space-y-6">
          {/* Fill up Section */}
          {paymentMethod !== "gcash" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-0 flex w-full flex-col gap-10 pr-18"
            >
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
                  onClick={() => setDeliveryMethod("delivery")}
                  className={`flex h-[60px] w-full cursor-pointer items-center gap-3 rounded-md border px-6 text-lg ${
                    deliveryMethod === "delivery"
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
                >
                  <Truck className="h-5 w-5 font-semibold text-gray-400" />{" "}
                  Deliver It
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
                  onClick={() => setPaymentMethod("gcash")}
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
                  <HandCoins className="h-5 w-5 text-gray-400" /> Cash On
                  Delivery
                </button>
              </div>
            </motion.div>
          )}

          {/* Conditionally render GcashPayment with animation */}
          {paymentMethod === "gcash" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <GcashPayment
                onBack={() => setPaymentMethod("cod")}
                onFileSelect={(file) => setProofOfPayment(file)}
              />
            </motion.div>
          )}

          {/* Summary Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="sticky top-26 flex w-full flex-col self-start border-l pl-18"
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <Image
                src={unit.image_url}
                alt={unit.name}
                height={1080}
                width={1980}
                className="w-[20rem] rounded-md object-cover object-center"
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
                  <span className="text-xl">{formatCurrency(deliveryFee)}</span>
                </div>

                <div className="mt-6 mb-0 flex items-center justify-between border-t pt-6">
                  <h2 className="text-xl font-semibold">Total</h2>
                  <span className="text-xl">{formatCurrency(total)}</span>
                </div>

                <button
                  disabled={
                    !unit.is_available ||
                    (paymentMethod === "gcash" && !proofOfPayment) ||
                    isLoading
                  }
                  onClick={handleCheckout}
                  className={`my-10 flex h-[55px] w-full items-center justify-center rounded-md border border-gray-400 bg-black text-lg font-semibold text-white transition hover:bg-gray-900 ${
                    !unit.is_available ||
                    (paymentMethod === "gcash" && !proofOfPayment)
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  } `}
                >
                  {isLoading ? <Loader /> : "Check Out"}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="arrival-date__container flex items-center justify-between">
                <h1 className="text-xl font-semibold">Arival Date</h1>
                <span className="text-lg font-semibold text-gray-600">
                  {startDate}
                </span>
              </div>

              <div className="return-date__container flex items-center justify-between">
                <h1 className="text-xl font-semibold">Return Date</h1>
                <span className="text-lg font-semibold text-gray-600">
                  {endDate}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
