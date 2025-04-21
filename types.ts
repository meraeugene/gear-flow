export type UserMetadata = {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
  address: string;
};

export type Category = {
  id: string;
  name: string;
  image_url: string;
  description?: string;
};

export interface Unit {
  id: string;
  name: string;
  image_url: string;
  price_per_day: number;
  category: string;
  is_available: "available" | "unavailable";
  description: string;
}

export interface UnitWithOwner {
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
}
