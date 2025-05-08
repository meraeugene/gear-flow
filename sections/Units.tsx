"use client";

import UnitCard from "@/components/UnitCard";
import { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import Link from "next/link";
import { motion } from "framer-motion";
import { UnitWithOwner } from "@/types";

interface UnitsProps {
  unitsData: UnitWithOwner[];
  unitTitle: string;
  href: string;
}

const Units = ({ unitsData, unitTitle, href }: UnitsProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const indexOfLastUnit = currentPage * itemsPerPage;
  const indexOfFirstUnit = indexOfLastUnit - itemsPerPage;
  const currentUnits = unitsData.slice(indexOfFirstUnit, indexOfLastUnit);

  const nextPage = () => {
    if (currentPage < Math.ceil(unitsData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="mb-8 flex flex-col flex-wrap justify-between gap-4 md:flex-row md:items-center">
        {/* Heading with responsive font size */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl">{unitTitle}</h1>

        <div className="next-prev__buttons flex items-center gap-3">
          {/* View All link with responsive font size */}
          <Link href={href} className="mr-2 text-sm sm:text-base">
            View All
          </Link>

          {/* Previous Page Button */}
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="circle-button text-lg sm:text-xl"
            aria-label="Previous Page"
          >
            <GrPrevious />
          </button>
          {/* Next Page Button */}
          <button
            onClick={nextPage}
            disabled={
              currentPage === Math.ceil(unitsData.length / itemsPerPage)
            }
            className="circle-button text-lg sm:text-xl"
            aria-label="Next Page"
          >
            <GrNext />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {currentUnits.map((unit, index) => (
          <motion.div
            initial={{ opacity: 0.3 }} // Start from right with 0 opacity
            animate={{ opacity: 1 }} // Slide in and fade in
            exit={{ opacity: 0 }} // Slide out to the left when removed
            transition={{
              duration: 0.5,
              delay: index * 0.1, // Delay based on index for staggered effect
              ease: "easeInOut", // Smooth easing for a more natural animation
            }}
            key={unit.unit_id}
            className="product-card animate-fade-in"
          >
            <UnitCard unitData={unit} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Units;
