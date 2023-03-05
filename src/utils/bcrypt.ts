import { compare } from "bcrypt";

export const Compare = (hashedPassword: string, plainPassword: string) => {
  return compare(plainPassword, hashedPassword);
};
