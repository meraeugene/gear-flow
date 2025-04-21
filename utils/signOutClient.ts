"use client";

import { signOut } from "@/app/auth/actions/authActions";

export const handleClientLogout = async () => {
  await signOut();
};
