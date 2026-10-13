import {
  CHARACTER_SETS,
  validatePasswordOptions,
  type PasswordOptions,
} from "./password";

export type StrengthLevel = "too-weak" | "weak" | "medium" | "strong";

export interface PasswordStrength {
  level: StrengthLevel;
  estimatedBits: number;
}

/**
 * Estimates the strength of a randomly generated password configuration.
 *
 * Uses password length and character-pool size to estimate entropy.
 * Assumes characters are selected using secure randomness.
 *
 * Limitation: This is an approximation because our generator guarantees
 * category coverage. It does not evaluate human-created passwords, detect
 * predictable patterns, check breached passwords, or model a specific
 * attacker's capabilities.
 *
 * @param options The password options specifying length and character categories.
 * @returns An object containing the estimated strength level and entropy in bits.
 */
export function estimatePasswordStrength(
  options: PasswordOptions,
): PasswordStrength {
  const { length, ...categories } = options;

  validatePasswordOptions(options);

  const poolSize = (
    Object.keys(CHARACTER_SETS) as Array<keyof typeof CHARACTER_SETS>
  ).reduce(
    (total, category) =>
      total + (categories[category] ? CHARACTER_SETS[category].length : 0),
    0,
  );

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
