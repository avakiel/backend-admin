'use client'

import { SessionProvider } from "next-auth/react";
import React, { FC } from "react";

interface Props {
  children: React.ReactNode
}

export const Provider: FC<Props>= ({children}) => {
  return <SessionProvider>{children}</SessionProvider>
}