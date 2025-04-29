type OptionType = { label: string; value: string | number };

type LocationBreadcrumbsProps = {
  steps: string[];
  step: number;
  selections: (OptionType | null)[];
  onStepChange: (index: number) => void;
};

const LocationBreadcrumbs = ({
  steps,
  step,
  selections,
  onStepChange,
}: LocationBreadcrumbsProps) => {
  return (
    <>
      {steps.map((label, i) => {
        const isClickable =
          i === 0 || // Province is always clickable
          (i === 1 && selections[0]) || // City requires Province
          (i === 2 && selections[0]); // Barangay requires Province

        return (
          <span
            key={i}
            className={`mx-1 inline-block ${
              step === i
                ? "font-bold text-black"
                : isClickable
                  ? "cursor-pointer text-gray-500"
                  : "cursor-not-allowed text-gray-300"
            }`}
            onClick={() => isClickable && onStepChange(i)}
          >
            {label}
            {i < steps.length - 1 && (
              <span className="mx-1 text-gray-400">/</span>
            )}
          </span>
        );
      })}
    </>
  );
};

export default LocationBreadcrumbs;
