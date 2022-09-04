import React from 'react';
import Link from 'next/link';
import styles from './main-navigation.module.css';
import { useSession, signOut } from 'next-auth/react';

export const MainNavigation: React.FC = () => {
  const { data: session, status } = useSession();

  const logoutHandler = async () => {
    await signOut();
  };

  return (
    <header className={styles.header}>
      <Link href={'/'}>
        <a>
          <div className={styles.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {status === 'unauthenticated' && (
            <li>
              <Link href={'/auth'}>Login</Link>
            </li>
          )}
          {status === 'authenticated' && (
            <li>
              <Link href={'/profile'}>Profile</Link>
            </li>
          )}
          {status === 'authenticated' && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
