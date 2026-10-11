import { describe, expect, it } from "vitest";
import { generatePassword, MAX_LENGTH, MIN_LENGTH, type PasswordOptions } from "./password";

const defaultOptions: PasswordOptions = {
  length: 16,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
};

describe("generatePassword", () => {
  it("generates the requested length", () => {
    const password = generatePassword(defaultOptions);

    expect(password).toHaveLength(16);
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
        length: 10,
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false,
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
    ).toThrow(`Password length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`);
  });

  it("rejects a password too long", () => {
    expect(() =>
      generatePassword({
        ...defaultOptions,
        length: 129,
      }),
    ).toThrow(`Password length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`);
  });

  it("rejects a non-integer password length", () => {
    expect(() =>
      generatePassword({
        ...defaultOptions,
        length: 1.5,
      }),
    ).toThrow(`Password length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`);
  });

  it("rejects a non-numeric password length", () => {
    expect(() =>
      generatePassword({
        ...defaultOptions,
        length: NaN,
      }),
    ).toThrow(`Password length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`);
  });

  it("generates one lowercase character", () => {
    const password = generatePassword({
      length: 1,
      lowercase: true,
      uppercase: false,
      numbers: false,
      symbols: false,
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
      numbers: true,
      lowercase: false,
      uppercase: false,
      symbols: false,
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
