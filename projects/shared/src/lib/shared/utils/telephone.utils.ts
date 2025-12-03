export const TELEPHONE_PATTERN = /^\+351\d{9}$/;

export function isValidTelephone(telephone: string): boolean {
  return TELEPHONE_PATTERN.test(telephone);
}
