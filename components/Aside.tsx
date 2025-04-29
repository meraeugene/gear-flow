"use client";

import AdminAside from "./aside/AdminAside";
import UserAside from "./aside/UserAside";
import { useAuthStore } from "@/stores/useAuthStore";

const Aside = () => {
  const { role } = useAuthStore();

  return (
    <div className="flex min-h-screen text-black">
      {role === "admin" ? <AdminAside /> : <UserAside />}
    </div>
  );
};

export default Aside;
