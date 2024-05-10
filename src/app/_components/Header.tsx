"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();

  return (
    <div className="bg-lavender-200 border-lavender-400 navbar mt-5 rounded-full border text-primary-content">
      <div className="flex-1 pl-5 text-3xl font-bold">
        {session?.user.name ? `Notes for ${session.user.name}` : "Notes"}
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          {session?.user ? (
            <label
              tabIndex={0}
              className="avatar btn btn-circle btn-ghost"
              onClick={() => void signOut()}
            >
              <div className="w-10 rounded-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={session.user.image!}
                  width={25}
                  height={25}
                  alt="user image"
                />
              </div>
            </label>
          ) : (
            <button
              className="btn btn-ghost rounded-btn"
              onClick={() => void signIn()}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
