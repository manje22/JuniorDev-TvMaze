"use client"

import { logout } from "@/lib/actions/auth";

export const SignOutBtn = () => {
    return <button className="bg-blue-200 hover:bg-blue-300" onClick={() => logout()}> Sign Out</button>
}