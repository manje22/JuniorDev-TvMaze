"use client"

import { login } from "@/lib/actions/auth";

export const SignInBtn = () => {
    return <button className="bg-blue-200 hover:bg-blue-300" onClick={() => login()}> Sign in with Github</button>
}