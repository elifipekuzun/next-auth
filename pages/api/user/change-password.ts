import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { getDB } from '../../../lib/db';
import { IUser } from '../../../lib/model/User';
import { comparePassword, hashPassword } from '../../../lib/auth';

export type ResProps = {
  message: string;
};

export type ChangePasswordProps = {
  oldPassword?: string;
  newPassword?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ResProps>) => {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }
  const userEmail = session.user?.email;
  if (!userEmail) {
    return;
  }
  const { oldPassword, newPassword } = req.body as ChangePasswordProps;

  if (
    !oldPassword ||
    oldPassword.trim().length < 6 ||
    !newPassword ||
    newPassword.trim().length < 6
  ) {
    res
      .status(422)
      .json({ message: 'Password should be at least 6 characters long.' });
    return;
  }

  const clientData = await getDB();
  const db = clientData?.db;
  if (!db) {
    res.status(500).json({ message: 'Could not connect to database!' });
    return;
  }

  const user = (await db
    .collection('users')
    .findOne({ email: userEmail })) as IUser;

  const isSame = await comparePassword(oldPassword, user.password);
  if (!isSame) {
    clientData.client.close();
    res.status(403).json({ message: 'Wrong old password entry!' });
    return;
  }

  const hashedPass = await hashPassword(newPassword);

  await db
    .collection('users')
    .updateOne({ email: userEmail }, { $set: { password: hashedPass } });

  clientData.client.close();
  res.status(200).json({ message: 'Success!' });
};

export default handler;
