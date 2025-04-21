import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps {
  id: string;
  name: string;
  label: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ id, name, label }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative flex flex-col">
      <label htmlFor={id} className="mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={show ? "text" : "password"}
        className="border border-gray-300 px-2 py-3 pr-10 focus:ring-2 focus:ring-gray-500 focus:outline-none"
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute top-[43px] right-3 text-gray-600"
        tabIndex={-1}
      >
        {show ? (
          <EyeOff className="cursor-pointer" size={18} />
        ) : (
          <Eye className="cursor-pointer" size={18} />
        )}
      </button>
    </div>
  );
};

export default PasswordField;
