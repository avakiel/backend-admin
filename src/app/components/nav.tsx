'use server'

import { signOut } from "next-auth/react";
import Link from "next/link";

export const Nav = () => {
  return <div><Link href="/api/auth/signin" onClick={() => signOut({
    callbackUrl: '/'
  })}>Sign Out</Link></div>;
};
