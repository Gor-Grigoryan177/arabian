export function isValidPhone(value: string): boolean {
  if (!value.trim()) return false;
  const phonePattern = /^[0-9+\-\s()]+$/;
  if (!phonePattern.test(value)) return false;
  const digitCount = (value.match(/\d/g) || []).length;
  return digitCount >= 6;
}

export function isValidContactHandle(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  const isHandle = /^@[a-zA-Z0-9._]+$/.test(trimmed);
  if (isHandle) return true;
  return isValidPhone(trimmed);
}

export function phoneErrorMessage(value: string): string | null {
  if (!value.trim()) return "Please enter your phone number";
  const phonePattern = /^[0-9+\-\s()]+$/;
  if (!phonePattern.test(value)) {
    return "Phone number can only contain digits, spaces, and + - ( )";
  }
  const digitCount = (value.match(/\d/g) || []).length;
  if (digitCount < 6) return "Please enter a valid phone number";
  return null;
}

export function contactHandleErrorMessage(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Please enter a phone number or Instagram handle";
  const isHandle = /^@[a-zA-Z0-9._]+$/.test(trimmed);
  const isPhoneLike = /^[0-9+\-\s()]+$/.test(trimmed);
  if (isHandle) return null;
  if (isPhoneLike) {
    const digitCount = (trimmed.match(/\d/g) || []).length;
    if (digitCount < 6) {
      return "Please enter a valid phone number or @instagram handle";
    }
    return null;
  }
  return "Enter a valid phone number or an @instagram handle";
}
