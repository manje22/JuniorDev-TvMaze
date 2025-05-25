"use client"

import { login } from "@/lib/actions/auth";

export const SignInBtn = () => {
    return <button className="bg-blue-400 hover:bg-blue-500 p-2 rounded-2xl" onClick={() => login()}> Sign in with Github</button>
}