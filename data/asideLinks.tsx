import {
  AppstoreOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import {
  FiEdit,
  FiLock,
  FiMail,
  FiCreditCard,
  FiShoppingBag,
  FiPackage,
  FiInbox,
} from "react-icons/fi";

export const userDashboardLinks = [
  {
    name: "Dashboard",
    href: "/account/dashboard",
    icon: <AppstoreOutlined size={18} />,
  },
  {
    name: "Units",
    href: "/account/units",
    icon: <FiPackage size={18} />,
  },
  {
    name: "Rentals",
    href: "/account/rentals",
    icon: <FiShoppingBag size={18} />,
  },
  {
    name: "Transactions",
    href: "/account/transactions",
    icon: <FiCreditCard size={18} />,
  },
  {
    name: "Rental Requests",
    href: "/account/rental-requests",
    icon: <FiInbox size={18} />,
  },
];

export const adminDashboardLinks = [
  {
    name: "Dashboard",
    href: "/account/dashboard",
    icon: <AppstoreOutlined size={18} />,
  },
  {
    name: "Manage Users",
    href: "/admin/manage-users",
    icon: <UsergroupAddOutlined size={18} />,
  },
];

export const settingsLinks = [
  {
    name: "Account Settings",
    href: "/account/settings",
    icon: <SettingOutlined style={{ fontSize: 18 }} />,
  },
  {
    name: "Edit Profile",
    href: "/account/settings/edit-profile",
    icon: <FiEdit size={18} />,
  },
  {
    name: "Reset Password",
    href: "/account/settings/reset-password",
    icon: <FiLock size={18} />,
  },
  {
    name: "Reset Email",
    href: "/account/settings/change-email",
    icon: <FiMail size={18} />,
  },
];
