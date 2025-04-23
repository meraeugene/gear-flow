import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {
  message: string;
  variant: "default" | "destructive" | null;
};

export function AlertComponent({ message, variant }: Props) {
  const title =
    variant === "destructive"
      ? "Error"
      : variant === "default"
        ? "Heads up!"
        : "";

  return (
    <Alert variant={variant}>
      <AlertCircle className="h-4 w-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
