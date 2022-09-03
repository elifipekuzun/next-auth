import { hash, compare } from 'bcryptjs';

export const hashPassword = async (clientPassword: string): Promise<string> => {
  const encrytedPass = await hash(clientPassword, 12);
  return encrytedPass;
};

export const comparePassword = async (
  clientPassword: string,
  hashedPassword: string
) => {
  const result = await compare(clientPassword, hashedPassword);
  return result;
};
