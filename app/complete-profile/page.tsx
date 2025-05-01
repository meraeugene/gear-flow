import { getAuthUser } from "@/actions/authActions";
import LocationForm from "@/components/forms/LocationForm";
import { redirect } from "next/navigation";

const page = async () => {
  const { user, error } = await getAuthUser();

  if (user && user.address && !error) {
    redirect("/");
  }

  return <LocationForm />;
};

export default page;
