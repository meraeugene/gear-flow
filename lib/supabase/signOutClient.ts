"use client";

import { signOut } from "@/actions/authActions";

export const handleClientLogout = async () => {
  await signOut();
};
