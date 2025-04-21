"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const sampleItems = [
  "Apple",
  "Banana",
  "Orange",
  "Strawberry",
  "Grapes",
  "Watermelon",
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const filteredItems = sampleItems.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="relative w-[250px]">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input
        type="text"
        placeholder="What are you looking for?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 100)} // slight delay to allow click
        className="pl-10 text-sm"
      />
      {focused && query && (
        <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-md">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                onMouseDown={() => {
                  setQuery(item);
                  setFocused(false);
                }}
              >
                {item}
              </div>
            ))
          ) : (
            <div className="text-muted-foreground px-4 py-2 text-sm">
              No results found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
