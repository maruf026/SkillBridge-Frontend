"use client";

import { toast } from "sonner";
import { useTransition } from "react";

interface BanButtonProps {
  userId: string;
  isBanned: boolean;
  userName: string;
  // Passing the Server Action as a prop
  onToggle: (id: string) => Promise<void>;
}

export function BanButton({ userId, isBanned, userName, onToggle }: BanButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleAction = async () => {
    startTransition(async () => {
      toast.promise(onToggle(userId), {
        loading: isBanned ? `Unbanning ${userName}...` : `Banning ${userName}...`,
        success: () => {
          return isBanned 
            ? `${userName} has been unbanned successfully.` 
            : `${userName} has been restricted.`;
        },
        error: "Failed to update user status.",
      });
    });
  };

  return (
    <button
      onClick={handleAction}
      disabled={isPending}
      className={`px-6 py-2 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 disabled:opacity-50 ${
        isBanned
          ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200"
          : "bg-rose-600 text-white hover:bg-rose-700 shadow-rose-200"
      }`}
    >
      {isBanned ? "Unban Account" : "Ban Account"}
    </button>
  );
}