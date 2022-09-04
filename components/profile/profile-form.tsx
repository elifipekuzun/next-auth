import React, { FormEvent, useState } from 'react';
import styles from './profile-form.module.css';

export type Params = {
  oldPass: string;
  newPass: string;
};

export type ChangePasswordProps = {
  onChangePassword: (params: Params) => void;
};

export const ProfileForm: React.FC<ChangePasswordProps> = ({
  onChangePassword,
}) => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    onChangePassword({ oldPass: oldPassword, newPass: newPassword });
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className={styles.control}>
        <label htmlFor="old-password">Old Password</label>
        <input
          type="password"
          id="old-password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div className={styles.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};
