import React from 'react';
import { ProfileForm } from './profile-form';
import styles from './user-profile.module.css';
import { Params } from './profile-form';

export const UserProfile: React.FC = () => {
  //Client-side protected page

  // const { status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     window.location.href = '/auth';
  //   },
  // });

  // if (status === 'loading') {
  //   return <h2 className={styles.profile}>Loading...</h2>;
  // }

  const changePasswordHandler = async (params: Params) => {
    const res = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify({
        oldPassword: params.oldPass,
        newPassword: params.newPass,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <section className={styles.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
};
