import { describe, expect, it } from "vitest";
import { estimatePasswordStrength } from "./strength";
import { DEFAULT_PASSWORD_LENGTH } from "./password";

describe("estimatePasswordStrength", () => {
  it("requires at least one character category to be selected", () => {
    expect(() =>
      estimatePasswordStrength({
        length: DEFAULT_PASSWORD_LENGTH,
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false,
      }),
    ).toThrow("Select at least one character category");
  });

  it("requires at least one character of each selected category", () => {
    const selectedCategories = {
      uppercase: true,
      lowercase: false,
      numbers: true,
      symbols: false,
    };
    const tooSmallLength =
      Object.values(selectedCategories).filter(Boolean).length - 1;

    expect(() =>
      estimatePasswordStrength({
        length: tooSmallLength,
        ...selectedCategories,
      }),
    ).toThrow("Password length must accommodate every selected category");
  });

  it('evaluates a password of 4 lowercase characters as "too weak"', () => {
    const strength = estimatePasswordStrength({
      length: 4,
      uppercase: false,
      lowercase: true,
      numbers: false,
      symbols: false,
    });

    expect(strength?.level).toBe("too-weak");
  });

  it('evaluates a password of 10 lowercase characters as "weak"', () => {
    const strength = estimatePasswordStrength({
      length: 10,
      uppercase: false,
      lowercase: true,
      numbers: false,
      symbols: false,
    });

    expect(strength?.level).toBe("weak");
  });

  it('evaluates a password of 16 lowercase characters as "medium"', () => {
    const strength = estimatePasswordStrength({
      length: 16,
      uppercase: false,
      lowercase: true,
      numbers: false,
      symbols: false,
    });

    expect(strength?.level).toBe("medium");
  });

  it('evaluates a password of 20 lowercase characters as "strong"', () => {
    const strength = estimatePasswordStrength({
      length: 20,
      uppercase: false,
      lowercase: true,
      numbers: false,
      symbols: false,
    });

    expect(strength?.level).toBe("strong");
  });
});
