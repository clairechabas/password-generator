import { describe, expect, it } from "vitest";
import {
  countSelectedCategories,
  ensureMinimumPasswordLength,
  generatePassword,
  MAX_LENGTH,
  MIN_LENGTH,
  type CharacterSelection,
  type PasswordOptions,
} from "./password";

const defaultLength = 10;
const allTrueCategories: CharacterSelection = {
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
};
const allFalseCategories: CharacterSelection = {
  uppercase: false,
  lowercase: false,
  numbers: false,
  symbols: false,
};
const defaultOptions: PasswordOptions = {
  length: defaultLength,
  ...allTrueCategories,
};

describe("generatePassword", () => {
  it("generates the requested length", () => {
    const password = generatePassword(defaultOptions);

    expect(password).toHaveLength(defaultLength);
  });

  it("includes every selected character category", () => {
    const password = generatePassword(defaultOptions);

    expect(password).toMatch(/[A-Z]/);
    expect(password).toMatch(/[a-z]/);
    expect(password).toMatch(/[0-9]/);
    expect(password).toMatch(/[^a-zA-Z0-9]/);
  });

  it("only uses enabled character categories", () => {
    const password = generatePassword({
      ...defaultOptions,
      uppercase: false,
      numbers: false,
      symbols: false,
    });

    expect(password).toMatch(/^[a-z]+$/);
  });

  it("rejects an empty character selection", () => {
    expect(() =>
      generatePassword({
        length: defaultLength,
        ...allFalseCategories,
      }),
    ).toThrow("Select at least one character category");
  });

  it("rejects a length shorter than the selected categories", () => {
    expect(() =>
      generatePassword({
        ...defaultOptions,
        length: 2,
      }),
    ).toThrow("Password length must accommodate every selected category");
  });

  it("rejects an empty password", () => {
    expect(() =>
      generatePassword({
        ...defaultOptions,
        length: 0,
      }),
    ).toThrow(
      `Password length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
    );
  });

  it("rejects a password too long", () => {
    expect(() =>
      generatePassword({
        ...defaultOptions,
        length: 129,
      }),
    ).toThrow(
      `Password length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
    );
  });

  it("rejects a non-integer password length", () => {
    expect(() =>
      generatePassword({
        ...defaultOptions,
        length: 1.5,
      }),
    ).toThrow(
      `Password length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
    );
  });

  it("rejects a non-numeric password length", () => {
    expect(() =>
      generatePassword({
        ...defaultOptions,
        length: NaN,
      }),
    ).toThrow(
      `Password length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
    );
  });

  it("generates one lowercase character", () => {
    const password = generatePassword({
      length: 1,
      ...allFalseCategories,
      lowercase: true,
    });

    expect(password).toHaveLength(1);
    expect(password).toMatch(/[a-z]/);
  });

  it("generates a password with just one character from each category", () => {
    const password = generatePassword({
      ...defaultOptions,
      length: 4,
    });

    expect(password).toHaveLength(4);
    expect(password).toMatch(/[a-z]/);
    expect(password).toMatch(/[A-Z]/);
    expect(password).toMatch(/[0-9]/);
    expect(password).toMatch(/[^a-zA-Z0-9]/);
  });

  it("generates a password with only digits", () => {
    const password = generatePassword({
      length: 4,
      ...allFalseCategories,
      numbers: true,
    });

    expect(password).toMatch(/[0-9]/);
    expect(password).not.toMatch(/[a-zA-Z]/);
  });

  it("generates a password with the maximum length", () => {
    const password = generatePassword({
      ...defaultOptions,
      length: 128,
    });

    expect(password).toHaveLength(128);
  });
});

describe("countSelectedCategories", () => {
  it("returns 0 when no categories are selected", () => {
    const count = countSelectedCategories({ ...allFalseCategories });
    expect(count).toBe(0);
  });

  it("returns 1 when one category is selected", () => {
    const count = countSelectedCategories({
      ...allFalseCategories,
      lowercase: true,
    });
    expect(count).toBe(1);
  });

  it("returns 4 when all categories are selected", () => {
    const count = countSelectedCategories({ ...defaultOptions });
    expect(count).toBe(4);
  });
});

describe("ensureMinimumPasswordLength", () => {
  it("returns the length if it is higher than the count of selected categories", () => {
    const length = 16;
    expect(ensureMinimumPasswordLength(length, allTrueCategories)).toBe(length);
  });

  it("returns the count of selected categories when it's higher than the length", () => {
    const length = 2;
    expect(ensureMinimumPasswordLength(length, allTrueCategories)).toBe(4);
  });

  it("returns the length when no categories are selected", () => {
    const length = 2;
    expect(ensureMinimumPasswordLength(length, allFalseCategories)).toBe(
      length,
    );
  });
});
