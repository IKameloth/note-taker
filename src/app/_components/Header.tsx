"use client";

import { useSession } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();

  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1 pl-5 text-3xl font-bold">
        {session?.user.name ? `Notes for ${session.user.name}` : "Notes"}
      </div>
    </div>
  );
}
