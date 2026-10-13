import type { CharacterCategory, CharacterSelection } from "../domain/password";
import "./CharacterOptions.css";

interface CharacterOptionsProps {
  selectedOptions: CharacterSelection;
  onOptionsSelection: (category: CharacterCategory, checked: boolean) => void;
}

export function CharacterOptions(props: CharacterOptionsProps) {
  const { selectedOptions, onOptionsSelection } = props;

  return (
    <fieldset className="character-options">
      <legend className="sr-only">Character categories</legend>

      {OPTIONS.map((option) => (
        <label key={option.key} className="character-option">
          <input
            type="checkbox"
            name={option.key}
            checked={selectedOptions[option.key]}
            onChange={(event) =>
              onOptionsSelection(option.key, event.currentTarget.checked)
            }
            className="character-option-input"
          />
          <span className="character-option-label">{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
}

const OPTIONS: ReadonlyArray<{ key: CharacterCategory; label: string }> = [
  { key: "uppercase", label: "Include Uppercase letters" },
  { key: "lowercase", label: "Include Lowercase letters" },
  { key: "numbers", label: "Include Numbers" },
  { key: "symbols", label: "Include Symbols" },
];
