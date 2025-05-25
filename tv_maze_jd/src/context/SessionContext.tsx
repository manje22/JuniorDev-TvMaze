// /context/SessionContext.tsx

"use client";

import { createContext, useContext } from "react";
import { Session } from "next-auth";
import { ReactNode } from "react";

const SessionContext = createContext<Session | null>(null);

export const useSessionContext = () => useContext(SessionContext);

export const SessionProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: Session | null;
}) => {
  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;


//Ovo služi za lakše dijeljenja session-a koji je potreban na više stranica (izbjegavam prop-drilling)
