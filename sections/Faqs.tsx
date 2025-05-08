"use client";

import { faqData } from "@/data/faqs";
import { useState } from "react";

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="animate-fadeInUp w-full max-w-4xl rounded-xl text-black">
        <h2 className="mb-10 text-center text-2xl font-semibold sm:text-3xl lg:text-4xl">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => toggle(index)}
            >
              <div className="flex items-center justify-between px-3 transition-all ease-in-out hover:bg-gray-50">
                <h3 className="py-3 text-base font-medium sm:text-lg md:text-xl">
                  {faq.question}
                </h3>
                <span className="text-xl sm:text-2xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>
              <div
                className={`overflow-hidden bg-gray-50 text-sm text-gray-700 transition-all duration-300 sm:text-base md:text-lg ${
                  openIndex === index ? "max-h-40 p-4" : "max-h-0"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
