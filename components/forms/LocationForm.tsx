"use client";

import Image from "next/image";
import Select from "react-select";
import { useState } from "react";
import { useLocationSelector } from "@/hooks/useLocationSelector";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { descriptions, steps, titles } from "@/data/setupLocation";
import Intro from "@/components/Intro";
import LocationBreadcrumbs from "@/components/forms/LocationBreadcrumbs";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { insertAddress } from "@/app/auth/actions/profileActions";

const LocationForm = () => {
  const router = useRouter();

  const {
    provinces,
    cities,
    barangays,
    selectedProvince,
    selectedCity,
    selectedBarangay,
    setSelectedProvince,
    setSelectedCity,
    setSelectedBarangay,
  } = useLocationSelector();

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const selections = [selectedProvince, selectedCity, selectedBarangay];
  const setters = [setSelectedProvince, setSelectedCity, setSelectedBarangay];
  const options = [provinces, cities, barangays];

  const handleContinue = () => {
    const currentOptions = options[step];
    const currentSelection = selections[step];

    // Allow proceeding if there are no options to choose from
    if (currentOptions.length === 0) {
      setStep((prev) => prev + 1);
      return;
    }

    if (!currentSelection) {
      toast.error(
        `Please select a ${steps[step].toLowerCase()} before continuing.`,
      );
      return;
    }

    setStep((prev) => prev + 1);
  };

  const handleFinish = async () => {
    const address = [
      selectedBarangay?.label,
      selectedCity?.label,
      selectedProvince?.label,
    ]
      .filter(Boolean) // Removes any undefined or null values
      .join(", ");

    console.log("Location Data:", address);

    try {
      setLoading(true);
      const { error, success, redirectUrl } = await insertAddress(address);

      if (error) {
        toast.error(error);
      } else {
        toast.success(success || "Location setup complete!");
        router.push(redirectUrl || "/");
      }
    } catch (error) {
      toast.error("Something went wrong while updating the address.");
    } finally {
      setLoading(false);
    }
  };

  if (showIntro) return <Intro onStart={() => setShowIntro(false)} />;

  return (
    <div className="mx-auto flex min-h-screen max-w-[35rem] flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <Image
          src="/assets/images/logo.png"
          width={65}
          height={65}
          alt="logo"
          className="mb-8"
        />
        <motion.div className="mb-2 text-gray-600">
          <LocationBreadcrumbs
            steps={steps}
            step={step}
            selections={selections}
            onStepChange={setStep}
          />
        </motion.div>
        <motion.h1
          key={`title-${step}`}
          className="text-3xl font-bold text-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {titles[step] || "Location Setup"}
        </motion.h1>
        <motion.p
          key={`desc-${step}`}
          className="mt-2 mb-8 text-base text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {descriptions[step] || ""}
        </motion.p>
      </motion.div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          step === 2 ? handleFinish() : handleContinue();
        }}
        className="flex w-[75%] flex-col"
      >
        <motion.div
          key={step}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
        >
          <Select
            instanceId={`select-${step}`}
            options={options[step]}
            value={selections[step]}
            onChange={setters[step]}
            placeholder={`Search for a ${steps[step]}`}
            isDisabled={step > 0 && !selections[step - 1]}
          />

          <motion.button
            key={`continue-${step}`}
            type="submit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-8 flex h-[50px] w-full cursor-pointer items-center justify-center rounded-sm bg-black font-semibold tracking-widest text-white uppercase transition hover:bg-gray-800"
          >
            {loading ? <Loader /> : step === 2 ? "Finish" : "Continue"}
          </motion.button>
        </motion.div>
      </form>
    </div>
  );
};

export default LocationForm;
