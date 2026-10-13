export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export const MIN_LENGTH = 1;
export const MAX_LENGTH = 128;

export const CHARACTER_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?/",
};

type CharacterCategory = keyof typeof CHARACTER_SETS;

/**
 * Generates a random index between 0 (inclusive) and the specified maximum (exclusive)
 * using cryptographically secure random values to ensure uniform distribution.
 *
 * @param max The exclusive upper bound for the random index.
 * @returns A random index between 0 (inclusive) and max (exclusive).
 */
function randomIndex(max: number): number {
  // Rejection sampling eliminates modulo bias.
  // Calculating `randomByte % pool.length` can make some characters slightly more likely than others.
  // We reject byte values that would produce an uneven distribution.
  // This gives each character an equal probability when sampling from a pool.
  const limit = 256 - (256 % max);
  const bytes = new Uint8Array(1);

  do {
    // The Web Crypto API provides cryptographically secure random values.
    crypto.getRandomValues(bytes);
  } while (bytes[0] >= limit);

  return bytes[0] % max;
}

function getRandomCharacter(characters: string): string {
  return characters[randomIndex(characters.length)];
}

/**
 * Shuffles the array in place using the Fisher-Yates algorithm.
 *
 * @param characters The array of characters to shuffle.
 */
function shuffle(characters: string[]): void {
  for (let i = characters.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    [characters[i], characters[j]] = [characters[j], characters[i]];
  }
}

/**
 * Generates a random password string based on the specified options.
 *
 * @param options The options specifying the password requirements.
 * @returns A randomly generated password string that meets the specified criteria.
 */
export function generatePassword(options: PasswordOptions): string {
  const { length } = options;

  if (!Number.isInteger(length) || length < MIN_LENGTH || length > MAX_LENGTH) {
    throw new RangeError(`Password length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`);
  }

  const selectedCharacterSets = (Object.keys(CHARACTER_SETS) as CharacterCategory[])
    .filter((category) => options[category] === true)
    .map((category) => CHARACTER_SETS[category]);

  if (selectedCharacterSets.length === 0) {
    throw new Error("Select at least one character category");
  }

  if (length < selectedCharacterSets.length) {
    throw new RangeError("Password length must accommodate every selected category");
  }

  const characterPool = selectedCharacterSets.join("");

  // Guarantee one character from each selected category.
  const password = selectedCharacterSets.map(getRandomCharacter);

  // Fill the remaining positions from the combined pool.
  while (password.length < length) {
    password.push(getRandomCharacter(characterPool));
  }

  // Remove the predictable category positions.
  shuffle(password);

  return password.join("");
}
