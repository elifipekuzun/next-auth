import React, { FormEvent, useState } from 'react';
import styles from './auth-form.module.css';
import { ResProps } from '../../pages/api/auth/signup';
import { IUser } from '../../lib/model/User';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const createUser = async (inputs: IUser) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  });
  const data = (await response.json()) as ResProps;

  return data;
};

export const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>();

  const router = useRouter();

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.ok) {
        router.replace('/profile');
      }
    } else {
      const resData = await createUser({ email, password });
      if (resData.message !== 'Success!') {
        setErrorMessage(resData.message);
        return;
      }
    }
    setEmail('');
    setPassword('');
  };
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={styles.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type="button"
            className={styles.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
      {errorMessage && <div>{errorMessage}</div>}
    </section>
  );
};
