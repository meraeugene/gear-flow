import { useEffect, useState } from "react";

export interface OptionType {
  value: string;
  label: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export const useLocationSelector = () => {
  const [provinces, setProvinces] = useState<OptionType[]>([]);
  const [cities, setCities] = useState<OptionType[]>([]);
  const [barangays, setBarangays] = useState<OptionType[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<OptionType | null>(
    null,
  );
  const [selectedCity, setSelectedCity] = useState<OptionType | null>(null);
  const [selectedBarangay, setSelectedBarangay] = useState<OptionType | null>(
    null,
  );

  useEffect(() => {
    fetch(`${API_BASE}/provinces`)
      .then((res) => res.json())
      .then((data) =>
        setProvinces(data.map((p: any) => ({ value: p.code, label: p.name }))),
      );
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      setCities([]);
      setBarangays([]);
      fetch(`${API_BASE}/provinces/${selectedProvince.value}/cities`)
        .then((res) => res.json())
        .then((data) =>
          setCities(data.map((c: any) => ({ value: c.code, label: c.name }))),
        );
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedCity) {
      setBarangays([]);
      fetch(`${API_BASE}/cities/${selectedCity.value}/barangays`)
        .then((res) => res.json())
        .then((data) =>
          setBarangays(
            data.map((b: any) => ({ value: b.code, label: b.name })),
          ),
        );
    }
  }, [selectedCity]);

  return {
    provinces,
    cities,
    barangays,
    selectedProvince,
    selectedCity,
    selectedBarangay,
    setSelectedProvince,
    setSelectedCity,
    setSelectedBarangay,
  };
};
