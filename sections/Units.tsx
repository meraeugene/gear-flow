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
      <h1 className="text-2xl">Explore Our {unitTitle}</h1>

      <div className="mb-8 flex items-center justify-between">
        <p className="text-base">{unitTitle}</p>

        <div className="next-prev__buttons flex items-center gap-3">
          <Link href={href} className="mr-2">
            View All
          </Link>

          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="circle-button"
          >
            <GrPrevious />
          </button>
          <button
            onClick={nextPage}
            disabled={
              currentPage === Math.ceil(unitsData.length / itemsPerPage)
            }
            className="circle-button"
          >
            <GrNext />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-x-4 gap-y-10">
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
