
import { signIn, signOut } from "next-auth/react";

export const login = async () => {
    await signIn("github", {redirectTo:"/"});
};

export const logout = async () => {
    await signOut({redirectTo:"/"});
};



//funkcije za log in i out pomoću next-auth
//https://www.youtube.com/watch?v=n-fVrzaikBQ&t=198s