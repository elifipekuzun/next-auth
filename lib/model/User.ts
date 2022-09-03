import { ObjectId, Document, WithId } from 'mongodb';

export interface IUser extends Partial<WithId<Document>> {
  email: string;
  password: string;
}
