import { hash, compare } from 'bcryptjs';

export async function generateHash(payload: string): Promise<string> {
  return hash(payload, 10);
}

export async function compareHash(
  payload: string,
  hash: string,
): Promise<boolean> {
  return compare(payload, hash);
}
