import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";



export const {auth, handlers, signIn, signOut} = NextAuth({
    providers: [GitHub]
})


//set up za next-auth, nabrajam koje provider-e cu koristit (Github)