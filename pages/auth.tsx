import { NextPage } from 'next';
import { AuthForm } from '../components/auth/auth-form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AuthPage: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/profile');
    }
  }, [status]);

  if (status === 'loading') {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <AuthForm />
    </>
  );
};

export default AuthPage;
