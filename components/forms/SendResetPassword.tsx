"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import Loader from "../Loader";
import { sendResetPasswordLink } from "@/actions/resetPasswordActions";

const SendResetPassword = ({ email }: { email: string }) => {
  const [loading, setLoading] = useState(false);

  const handleSendResetPasswordLink = async () => {
    setLoading(true);

    // Create FormData object with email
    const formData = new FormData();
    formData.append("email", email);

    const { error, success } = await sendResetPasswordLink(formData);

    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    toast.success(success);
    setLoading(false);
  };

  return (
    <Button
      onClick={handleSendResetPasswordLink}
      className="w-32 cursor-pointer"
    >
      {loading ? <Loader /> : "Send Reset Link"}
    </Button>
  );
};

export default SendResetPassword;
