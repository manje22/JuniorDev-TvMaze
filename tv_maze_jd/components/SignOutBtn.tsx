"use client"

import { logout } from "@/lib/actions/auth";

export const SignOutBtn = () => {
    return <button className="bg-blue-400 hover:bg-blue-500 p-2 rounded-2xl" onClick={() => logout()}> Sign Out</button>
}