"use client";

import Select, { SingleValue } from "react-select";

type Option = {
  label: string;
  value: string;
};

interface LocationSelectProps {
  step: number;
  provinces: Option[];
  cities: Option[];
  barangays: Option[];
  selectedProvince: Option | null;
  selectedCity: Option | null;
  selectedBarangay: Option | null;
  setSelectedProvince: (value: SingleValue<Option>) => void;
  setSelectedCity: (value: SingleValue<Option>) => void;
  setSelectedBarangay: (value: SingleValue<Option>) => void;
}

const LocationSelect = ({
  step,
  provinces,
  cities,
  barangays,
  selectedProvince,
  selectedCity,
  selectedBarangay,
  setSelectedProvince,
  setSelectedCity,
  setSelectedBarangay,
}: LocationSelectProps) => {
  switch (step) {
    case 0:
      return (
        <Select
          instanceId="province-select"
          options={provinces}
          value={selectedProvince}
          onChange={setSelectedProvince}
        />
      );
    case 1:
      return (
        <Select
          instanceId="city-select"
          options={cities}
          value={selectedCity}
          onChange={setSelectedCity}
          isDisabled={!selectedProvince}
        />
      );
    case 2:
      return (
        <Select
          instanceId="barangay-select"
          options={barangays}
          value={selectedBarangay}
          onChange={setSelectedBarangay}
          isDisabled={!selectedCity}
        />
      );
    default:
      return null;
  }
};

export default LocationSelect;
