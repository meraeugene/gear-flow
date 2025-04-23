"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex cursor-pointer items-center gap-2 text-sm transition-transform duration-200 hover:-translate-x-1"
    >
      <ArrowLeft size={18} />
    </button>
  );
};

export default BackButton;
