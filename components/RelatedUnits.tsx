"use client";

import { UnitWithOwner } from "@/types";
import { motion } from "framer-motion";
import UnitCard from "./UnitCard";
import { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";

interface RelatedUnitsProps {
  relatedUnitsData: UnitWithOwner[];
}

const RelatedUnits = ({ relatedUnitsData }: RelatedUnitsProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  const indexOfLastUnit = currentPage * itemsPerPage;
  const indexOfFirstUnit = indexOfLastUnit - itemsPerPage;
  const currentUnits = relatedUnitsData.slice(
    indexOfFirstUnit,
    indexOfLastUnit,
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(relatedUnitsData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="mt-24">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Related Units</h1>
        <div className="next-prev__buttons flex items-center gap-3">
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
              currentPage === Math.ceil(relatedUnitsData.length / itemsPerPage)
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

export default RelatedUnits;
