import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getDB } from '../../../lib/db';
import { comparePassword } from '../../../lib/auth';

export default NextAuth({
  secret: 'AUTH_SECRET_KEY',
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { type: 'email', label: 'Email' },
        password: { type: 'password', label: 'Password' },
      },
      async authorize(credentials) {
        const clientData = await getDB();
        const db = clientData?.db;
        const existingUser = await db
          ?.collection('users')
          .findOne({ email: credentials?.email });

        if (!existingUser || !existingUser._id) {
          clientData?.client.close();
          throw new Error('No user found!');
        }
        if (!credentials?.password) {
          clientData?.client.close();
          throw new Error('You have to pass in your password');
        }
        const isSame = await comparePassword(
          credentials?.password,
          existingUser.password
        );
        if (!isSame) {
          clientData?.client.close();
          throw new Error('Wrong password!');
        }

        clientData?.client.close();

        return { email: credentials.email };
      },
    }),
  ],
});
