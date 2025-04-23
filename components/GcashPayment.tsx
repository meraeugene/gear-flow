"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

interface GcashPaymentProps {
  onBack: () => void;
  onFileSelect: (file: File) => void;
}

const GcashPayment = ({ onBack, onFileSelect }: GcashPaymentProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (file: File) => {
    onFileSelect(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  // Clean up the object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="gcash-payment__container w-full pr-18">
      <button
        onClick={onBack}
        className="inline-flex cursor-pointer items-center gap-2 text-sm transition-transform duration-200 hover:-translate-x-1"
      >
        <ArrowLeft size={21} color="black" />
      </button>

      <div className="qr-code__container flex flex-col items-center justify-center gap-1">
        <h1 className="text-lg font-semibold">Scan Owner’s QR To Pay</h1>
        <Image
          className="w-[20rem] object-cover"
          src="/assets/images/gcashqr.jpg"
          width={1920}
          height={1080}
          alt="qr"
        />
      </div>

      <div className="space-y-8">
        <div className="payment-instruction__container">
          <h1 className="mb-3 text-lg font-semibold">Payment Instructions</h1>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <span className="font-semibold">Step 1:</span> Open your Gcash
              app.
            </li>
            <li>
              <span className="font-semibold">Step 2:</span> Choose “Send Money”
              or scan the QR code.
            </li>
            <li>
              <span className="font-semibold">Step 3:</span> Enter the amount
              shown in the order summary.
            </li>
            <li>
              <span className="font-semibold">Step 4:</span> Send payment and
              screenshot the confirmation.
            </li>
          </ul>
        </div>

        <div className="receipt-upload__container">
          <h1 className="mb-3 text-lg font-semibold">Proof of Payment</h1>

          <label
            htmlFor="uploadFile1"
            className="mx-auto flex h-52 max-w-md cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 bg-white text-base font-semibold text-slate-500"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Proof Preview"
                className="h-full w-full rounded object-contain"
              />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-3 w-11 fill-gray-500"
                  viewBox="0 0 32 32"
                >
                  <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                  <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
                </svg>
                Upload file
                <p className="mt-2 text-xs font-medium text-slate-400">
                  PNG, JPG, SVG, WEBP, and GIF are allowed.
                </p>
              </>
            )}
            <input
              type="file"
              id="uploadFile1"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileChange(e.target.files[0]);
                }
              }}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default GcashPayment;
