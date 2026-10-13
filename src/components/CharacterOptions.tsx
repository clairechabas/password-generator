import React from "react";
import type { PasswordOptions } from "../domain/password";
import "./CharacterOptions.css";

type CharacterCategory = Exclude<keyof PasswordOptions, "length">;

const OPTIONS: ReadonlyArray<{ key: CharacterCategory; label: string }> = [
  { key: "uppercase", label: "Include Uppercase letters" },
  { key: "lowercase", label: "Include Lowercase letters" },
  { key: "numbers", label: "Include Numbers" },
  { key: "symbols", label: "Include Symbols" },
];

export const DEFAULT_OPTIONS: Record<CharacterCategory, boolean> = {
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: false,
};

interface CharacterOptionsProps {
  selected: Record<CharacterCategory, boolean>;
  setSelected: React.Dispatch<React.SetStateAction<Record<CharacterCategory, boolean>>>;
}

export function CharacterOptions(props: CharacterOptionsProps) {
  const { selected, setSelected } = props;

  function handleChange(category: CharacterCategory, checked: boolean) {
    setSelected((current) => ({
      ...current,
      [category]: checked,
    }));
  }

  return (
    <fieldset className="character-options">
      <legend className="sr-only">Character categories</legend>

      {OPTIONS.map((option) => (
        <label key={option.key} className="character-option">
          <input
            type="checkbox"
            name={option.key}
            checked={selected[option.key]}
            onChange={(event) => handleChange(option.key, event.currentTarget.checked)}
            className="character-option-input"
          />
          <span className="character-option-label">{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
}
