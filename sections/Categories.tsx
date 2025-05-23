"use client";

import { useEffect, useState } from "react";
import CategoryCard from "@/components/CategoryCard";
import { GrNext, GrPrevious } from "react-icons/gr";
import Link from "next/link";
import { motion } from "framer-motion";
import { Category } from "@/types";

interface CategoriesProps {
  categoriesData: Category[];
}

const Categories = ({ categoriesData }: CategoriesProps) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1536) {
        setItemsPerPage(5); // 2xl
      } else if (width >= 1280) {
        setItemsPerPage(4); // xl
      } else if (width >= 1024) {
        setItemsPerPage(4); // lg
      } else if (width >= 768) {
        setItemsPerPage(3); // Tablet
      } else {
        setItemsPerPage(1); // Mobile
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Calculate the categories to display for the current page
  const indexOfLastCategory = currentPage * itemsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
  const currentCategories = categoriesData.slice(
    indexOfFirstCategory,
    indexOfLastCategory,
  );

  // Handle next and previous button clicks
  const nextPage = () => {
    if (currentPage < Math.ceil(categoriesData.length / itemsPerPage)) {
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
        <h1 className="text-2xl sm:text-3xl">Categories</h1>
        <div className="hidden md:block" />
        <div className="next-prev__buttons flex items-center gap-3">
          <Link href="/units" className="mr-2 text-sm sm:text-base">
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
              currentPage === Math.ceil(categoriesData.length / itemsPerPage)
            }
            className="circle-button text-lg sm:text-xl"
            aria-label="Next Page"
          >
            <GrNext />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
        {currentCategories.map((category, index) => (
          <motion.div
            key={category.id}
            className="category-card"
            initial={{ opacity: 0.3 }} // Start from right with 0 opacity
            animate={{ opacity: 1 }} // Slide in and fade in
            exit={{ opacity: 0 }} // Slide out to the left when removed
            transition={{
              duration: 0.5,
              delay: index * 0.1, // Delay based on index for staggered effect
              ease: "easeInOut", // Smooth easing for a more natural animation
            }}
          >
            <CategoryCard
              id={category.id}
              name={category.name}
              image_url={category.image_url}
              description={category.description}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
