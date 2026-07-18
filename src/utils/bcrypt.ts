import { compare, hash } from "bcrypt";

const encryptPassword = async (
  password: string,
  salt: number = 12
): Promise<string> => {
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};

export { encryptPassword, comparePassword };
