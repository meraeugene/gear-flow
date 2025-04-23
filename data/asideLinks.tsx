import {
  AppstoreOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { FiBox, FiPackage, FiEdit, FiLock, FiMail } from "react-icons/fi";

export const userDashboardLinks = [
  {
    name: "Dashboard",
    href: "/account/dashboard",
    icon: <AppstoreOutlined size={18} />,
  },
  {
    name: "My Units",
    href: "/account/my-units",
    icon: <FiPackage size={18} />,
  },
  {
    name: "Rental Status",
    href: "/account/rental-status",
    icon: <FiBox size={18} />,
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
