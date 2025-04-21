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
      <div className="animate-fadeInUp w-full max-w-4xl rounded-xl p-8 text-black">
        <h2 className="mb-10 text-center text-3xl font-semibold">
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
                <h3 className="py-3 text-xl font-medium">{faq.question}</h3>
                <span className="text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>
              <div
                className={`overflow-hidden bg-gray-50 text-lg text-gray-700 transition-all duration-300 ${
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
