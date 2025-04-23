"use client";

import { useTransition, useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  banUser,
  deleteUser,
  unbanUser,
} from "@/app/auth/actions/usersActions";
import { toast } from "sonner";
import { User } from "@/types";

type Props = {
  users: User[];
  currentUser: User;
};

export default function UsersTable({ users, currentUser }: Props) {
  const [isPending, startTransition] = useTransition();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<
    "ban" | "unban" | "delete" | null
  >(null);

  const handleAction = () => {
    if (!selectedUserId || !actionType) return;

    // Determine the correct action function
    const action =
      actionType === "ban"
        ? banUser
        : actionType === "unban"
          ? unbanUser
          : deleteUser;

    startTransition(async () => {
      const result = await action(selectedUserId);

      if ("error" in result) {
        toast.error(result.error);
      } else {
        toast.success(result.success);
        window.location.reload();
      }
    });
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-300">
      <table className="min-w-full bg-white text-left text-sm text-gray-900">
        <thead className="border-b bg-gray-100">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.auth_user_id} className="border-b">
              <td className="p-3">
                {user.first_name} {user.last_name}
              </td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                <span
                  className={`w-full rounded-md px-3 py-1 text-xs font-semibold capitalize ${
                    user.role === "admin"
                      ? "border bg-purple-100 text-purple-500"
                      : "border bg-blue-100 text-blue-600"
                  } `}
                >
                  {user.role}
                </span>
              </td>
              <td className="p-3">
                <span
                  className={`inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-semibold capitalize ${
                    user.is_banned
                      ? "border bg-red-100 text-red-500"
                      : "border bg-green-100 text-green-600"
                  }`}
                >
                  {user.is_banned ? "Banned" : "Active"}
                </span>
              </td>
              <td className="space-x-2 p-3 text-right">
                {user.role !== "admin" &&
                  user.auth_user_id !== currentUser.auth_user_id && (
                    <>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            className="cursor-pointer rounded border border-yellow-100 bg-yellow-100 px-3 py-1 text-xs text-yellow-700 hover:bg-yellow-300 disabled:opacity-50"
                            disabled={
                              isPending ||
                              (user.is_banned && actionType === "ban")
                            }
                            onClick={() => {
                              setSelectedUserId(user.auth_user_id);
                              setActionType(user.is_banned ? "unban" : "ban");
                            }}
                          >
                            {user.is_banned ? "Unban" : "Ban"}
                          </button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              {user.is_banned ? "Unban user?" : "Ban user?"}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              {user.is_banned
                                ? "This will lift the ban and allow them to access the system again."
                                : "This will prevent them from accessing the system."}
                              Continue?
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleAction}>
                              {user.is_banned ? "Unban" : "Confirm"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            className="cursor-pointer rounded border border-red-100 bg-red-100 px-3 py-1 text-xs text-red-600 hover:bg-red-500 hover:text-white disabled:opacity-50"
                            disabled={isPending}
                            onClick={() => {
                              setSelectedUserId(user.auth_user_id);
                              setActionType("delete");
                            }}
                          >
                            Delete
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete user?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. Delete this user?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleAction}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
