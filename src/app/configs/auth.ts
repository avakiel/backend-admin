import { RequestInternal, Session, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials'

interface UserWithRole extends User {
  role: string;
}

export interface SessionWithUserRole extends Session {
  data: any;
  user: UserWithRole;
}

const users = [
  {
    id: 1,
    email: 'vadik.sajnuykk@gmail.com',
    password: '123123',
    role: 'super-admin'
  },
  {
    id: 2,
    email: 'ivan.kulikovsky.9970@gmail.com',
    password: '123',
    role: 'super-admin'
  },
  {
    id: 3,
    email: 'aleksandrrezanov17@gmail.com',
    password: '123123123',
    role: 'super-admin'
  },
  {
    id: 4,
    email: 'maxplay123890@gmail.com',
    password: '0000',
    role: 'super-admin'
  },
];

export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email', required: true },
        password: { label: 'Password', type: 'password', required: true }
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "method" | "headers" | "query">) {
        try {
          if (!credentials?.email || !credentials.password) return null;

          const currentUser = await users.find(user => user.email === credentials.email);

          if(currentUser && currentUser.password === credentials.password) {
            return { ...currentUser, password: null, role: currentUser.role, id: currentUser.id.toString() };
          }

        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ], 
  callbacks: {
    async jwt({ token, user }: { token: any, user: UserWithRole }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }: { token: any, session: SessionWithUserRole }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
}
