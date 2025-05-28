"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import UserUnits from "@/components/UserUnits";
import { UnitWithOwner } from "@/types";

export default function InfiniteUserUnits({ lenderId }: { lenderId: string }) {
  // State to store loaded units
  const [units, setUnits] = useState<UnitWithOwner[]>([]);
  // State to indicate if a fetch is in progress
  const [loading, setLoading] = useState(false);
  // State to indicate if there are more units to load
  const [hasMore, setHasMore] = useState(true);

  // Ref to track the current page for pagination (avoids stale closures)
  const pageRef = useRef(1);
  // Ref to track the loader div for infinite scroll observation
  const loader = useRef<HTMLDivElement | null>(null);

  // Fetch units from API with pagination
  const fetchUnits = useCallback(async () => {
    // Prevent fetching if already loading or if there are no more units
    if (loading || !hasMore) return;

    setLoading(true);

    // Fetch paginated units for the lender
    const res = await fetch(
      `/api/lender-units?lenderId=${lenderId}&page=${pageRef.current}&limit=6`,
    );

    if (res.ok) {
      const data = await res.json();
      const newUnits = data.units ?? [];

      // Merge new units while avoiding duplicates
      setUnits((prev) => {
        const existingIds = new Set(prev.map((u) => u.unit_id));
        const filtered = newUnits.filter(
          (u: UnitWithOwner) => !existingIds.has(u.unit_id),
        );
        return [...prev, ...filtered];
      });

      // If fewer units returned than limit, we've reached the end
      if (newUnits.length < 6) {
        setHasMore(false);
      }

      // Increment page number for next fetch
      pageRef.current += 1;
    } else {
      setHasMore(false);
    }

    setLoading(false);
  }, [lenderId, loading, hasMore]);

  // Initial load when component mounts
  useEffect(() => {
    fetchUnits();
  }, [fetchUnits]);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (!loader.current) return;

    const currentLoader = loader.current; // capture ref locally

    const observer = new IntersectionObserver(
      (entries) => {
        // When loader div comes into view, fetch more units
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchUnits();
        }
      },
      { rootMargin: "100px" }, // Preload slightly before reaching bottom
    );

    observer.observe(currentLoader);

    return () => {
      observer.unobserve(currentLoader); // use local variable here
    };
  }, [fetchUnits, hasMore, loading]);

  return (
    <>
      {/* Render all fetched units */}
      <UserUnits units={units} />

      {/* Loader and status indicator */}
      <div
        ref={loader}
        className="mt-12 flex flex-col items-center justify-center gap-4"
      >
        {/* Spinner shown while loading */}
        {loading && (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent text-black" />
        )}
        {/* Message when all units have been loaded */}
        {!hasMore && <p>No more units.</p>}
      </div>
    </>
  );
}
