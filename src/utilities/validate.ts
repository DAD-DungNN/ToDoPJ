export function isFullSize(value?: string) {
  if (!value) {
    return true;
  }

  const regexp = new RegExp(/^[ａ-ｚＡ-Ｚ０-９ぁ-んァ-ン一-龥　、。ー]+$/);

  return regexp.test(value);
}

export function isHalfSize(value?: string) {
  if (!value) {
    return true;
  }

  const regexp = new RegExp(/^[^ａ-ｚＡ-Ｚ０-９ぁ-んァ-ン一-龥　、。ー]+$/);

  return regexp.test(value);
}

export function isHalfSizeAlphanumeric(value?: string) {
  if (!value) {
    return true;
  }

  const regexp = new RegExp(/^[a-zA-Z0-9]+$/);

  return regexp.test(value);
}

declare const ValidateStatuses: ['success', 'warning', 'error', 'validating', ''];
export declare type ValidateStatus = typeof ValidateStatuses[number];
