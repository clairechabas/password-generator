import { CHARACTER_SETS, type PasswordOptions } from "./password";

export type StrengthLevel = "too-weak" | "weak" | "medium" | "strong";

export interface PasswordStrength {
  level: StrengthLevel;
  estimatedBits: number;
}

export function estimatePasswordStrength(options: PasswordOptions): PasswordStrength | null {
  const { length, ...categories } = options;

  if (!Number.isInteger(length) || length < 1) {
    return null;
  }

  const poolSize = (Object.keys(CHARACTER_SETS) as Array<keyof typeof CHARACTER_SETS>).reduce(
    (total, category) => total + (categories[category] ? CHARACTER_SETS[category].length : 0),
    0,
  );

  const selectedCount = Object.values(categories).filter(Boolean).length;

  if (poolSize === 0 || length < selectedCount) {
    return null;
  }

  const estimatedBits = length * Math.log2(poolSize);

  let level: StrengthLevel;

  if (estimatedBits < 28) {
    level = "too-weak";
  } else if (estimatedBits < 50) {
    level = "weak";
  } else if (estimatedBits < 80) {
    level = "medium";
  } else {
    level = "strong";
  }

  return { level, estimatedBits };
}
