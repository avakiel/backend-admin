import type { AuthOptions, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

const users = [
  {
    email: 'vadik.sajnuykk@gmail.com',
    password: '123123'
  },
  {
    email: 'ivan.kulikovsky.9970@gmail.com',
    password: '123'
  },
  {
    email: 'aleksandrrezanov17@gmail.com',
    password: '123123123'
  },
  {
    email: 'maxplay123890@gmail.com',
    password: '0000'
  },
];

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email', required: true },
        password: { label: 'Password', type: 'password', required: true }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const currentUser = users.find(user => user.email === credentials.email);

        if(currentUser && currentUser.password === credentials.password) {
          const { password, ...userWithoutPass } = currentUser;

          return userWithoutPass as User;
        }

        return null
      }
    })
  ]
}