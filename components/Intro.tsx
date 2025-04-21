"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type IntroProps = {
  onStart: () => void;
};

const Intro = ({ onStart }: IntroProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mx-auto flex min-h-screen max-w-[35rem] flex-col items-center justify-center px-4 text-center"
    >
      <Image
        src="/assets/images/logo.png"
        width={80}
        height={80}
        alt="logo"
        className="mb-6"
      />
      <h1 className="mb-4 text-3xl font-bold text-gray-900">
        Welcome to Gearflow!
      </h1>
      <p className="mb-8 text-gray-600">
        But first, we need your location to personalize your experience.
      </p>
      <button
        onClick={onStart}
        className="cursor-pointer rounded-sm bg-black px-6 py-3 font-semibold tracking-widest text-white uppercase hover:bg-gray-800"
      >
        Get Started
      </button>
    </motion.div>
  );
};

export default Intro;
