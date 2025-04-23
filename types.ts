export type User = {
  auth_user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  address: string;
  phone_number: string;
  is_banned: boolean;
  created_at: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  created_at?: string;
  slug?: string; // Optional, if you're generating it dynamically
};

export type UnitWithOwner = {
  id: string;
  name: string;
  image_url: string;
  price_per_day: number;
  category: string;
  is_available: "available" | "unavailable";
  description: string;
  owner?: {
    first_name: string;
    last_name: string;
  };
};

export type RentalData = {
  id: string;
  unit_id: string;
  renter_id: string;
  start_date: string;
  end_date: string;
  delivery_method: string;
  total_price: number;
  status: string;
  created_at: string;
};

export type TransactionData = {
  id: string;
  rental_id: string;
  amount: number;
  payment_method: string;
  status: string;
  proof_of_payment_url: string | null;
  transaction_date: string;
};
