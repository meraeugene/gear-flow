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
  unit_id: string;
  name: string;
  image_url: string;
  price_per_day: number;
  category_id: string;
  category_name: string;
  is_available: "available" | "unavailable";
  description: string;
  owner_first_name: string;
  owner_last_name: string;
};

export type userInfo = {
  address: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_picture: string;
  email: string;
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
  unit_name: string;
  owner: userInfo;
};

export type TransactionData = {
  transaction_id: string;
  rental_id: string;
  amount: number;
  payment_method: string;
  status: string;
  proof_of_payment_url: string | null;
  transaction_date: string;
  unit_name: string;
  owner: userInfo;
};

export type RentalStatus = "pending" | "ongoing" | "completed" | "cancelled";

export interface Renter {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  profile_picture: string;
}

export interface Unit {
  name: string;
  image_url: string;
  owner_id: string;
  price_per_day: number;
}

export interface RentalRequest {
  id: string;
  start_date: string;
  end_date: string;
  status: RentalStatus;
  total_price: number;
  unit: Unit;
  renter: Renter;
  payment_method: string;
  payment_status: string;
  proof_of_payment_url: string;
  transaction_date: string;
}

export type RentalRecord = {
  status: RentalStatus;
  unit_id: string;
};
