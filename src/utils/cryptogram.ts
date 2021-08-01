import * as crypto from 'crypto';

/**
 *
 *
 * @export
 * @return {*}  {string}
 */
export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64');
}

/**
 *
 *
 * @export
 * @param {string} password
 * @param {string} salt
 * @return {*}  {string}
 */
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  const tempSalt = Buffer.from(salt, 'base64');
  return crypto
    .pbkdf2Sync(password, tempSalt, 1000, 16, 'sha1')
    .toString('base64');
}
