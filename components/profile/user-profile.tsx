import React from 'react';
import { ProfileForm } from './profile-form';
import styles from './user-profile.module.css';

export const UserProfile: React.FC = () => {
  return (
    <section className={styles.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};
