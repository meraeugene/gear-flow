"use client";

import { useState, useEffect, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { searchUnits } from "@/app/auth/actions/unitActions";
import { UnitWithOwner } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { generateSlug } from "@/utils/generateSlug";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState<UnitWithOwner[]>([]);
  const [isPending, startTransition] = useTransition(); // Using isPending

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim()) {
        startTransition(async () => {
          const res = await searchUnits(query);
          if (!res.error) {
            setResults(res.searchUnits || []);
          }
        });
      } else {
        setResults([]); // Clear results when query is empty
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="relative w-[350px]">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        className="pr-8 pl-10 text-sm"
        placeholder="What unit are you searching for?"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      )}

      <AnimatePresence>
        {focused && query && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-md"
          >
            {isPending ? (
              <div className="flex items-center justify-center py-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent" />
              </div>
            ) : (
              results.map((unit) => (
                <Link
                  href={`/units/${unit.id}/${generateSlug(unit.name)}`}
                  key={unit.id}
                  className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100"
                  onMouseDown={() => {
                    setQuery(unit.name);
                    setFocused(false);
                  }}
                >
                  <div className="flex flex-col text-sm">
                    <span className="font-medium">{unit.name}</span>
                    <span className="text-muted-foreground text-xs">
                      {unit.category} • ₱{unit.price_per_day}/day
                    </span>
                  </div>
                </Link>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
