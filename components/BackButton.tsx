"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex cursor-pointer items-center gap-2 rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 transition-all hover:bg-gray-100"
    >
      <ArrowLeft size={14} />
      Back
    </button>
  );
};

export default BackButton;
