import { NextApiRequest, NextApiResponse } from 'next';
import { getDB } from '../../../lib/db';
import { IUser } from '../../../lib/model/User';
import { hashPassword } from '../../../lib/auth';

export type ResProps = {
  message: string;
  user?: IUser;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ResProps>) => {
  if (req.method === 'POST') {
    const { email, password } = req.body as IUser;
    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 6
    ) {
      res.status(422).json({
        message:
          'Invalid input - password should also be at least 6 characters long.',
      });
      return;
    }
    const clientObject = await getDB();
    if (!clientObject?.db) {
      res.status(500).json({ message: 'Could not connect to database' });
      return;
    }
    const user = await clientObject.db.collection('users').findOne({ email });
    if (user) {
      res.status(422).json({ message: 'This email is already in use.' });
      clientObject.client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await clientObject.db
      .collection('users')
      .insertOne({ email, password: hashedPassword });

    clientObject.client.close();

    res.status(201).json({ message: 'Success!' });
  }
};

export default handler;
