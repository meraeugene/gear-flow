"use client";

import { motion } from "framer-motion";
import UnitCard from "./UnitCard";
import { UnitWithOwner } from "@/types";

interface UserUnitsProps {
  units: UnitWithOwner[];
}

const UserUnits = ({ units }: UserUnitsProps) => {
  return (
    <div className="user-units__container">
      <div className="grid grid-cols-3 gap-x-4 gap-y-10">
        {units.map((unit, index) => (
          <motion.div
            initial={{ opacity: 0.3 }} // Start from right with 0 opacity
            animate={{ opacity: 1 }} // Slide in and fade in
            exit={{ opacity: 0 }} // Slide out to the left when removed
            transition={{
              duration: 0.5,
              delay: index * 0.1, // Delay based on index for staggered effect
              ease: "easeInOut", // Smooth easing for a more natural animation
            }}
            key={unit.id}
            className="product-card animate-fade-in"
          >
            <UnitCard unitData={unit} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserUnits;
