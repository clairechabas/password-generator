import React from "react";
import "./App.css";
import { estimatePasswordStrength } from "./domain/strength";
import {
  countSelectedCategories,
  DEFAULT_PASSWORD_LENGTH,
  DEFAULT_PASSWORD_OPTIONS,
  ensureMinimumPasswordLength,
  type CharacterCategory,
  type PasswordOptions,
} from "./domain/password";
import {
  CharacterLengthSlider,
  CharacterOptions,
  StrengthIndicator,
} from "./components";

export default function App() {
  const [options, setOptions] = React.useState<PasswordOptions>({
    ...DEFAULT_PASSWORD_OPTIONS,
    length: DEFAULT_PASSWORD_LENGTH,
  });

  function handleCategoryChange(category: CharacterCategory, checked: boolean) {
    setOptions((currentOptions) => {
      const newOptions = { ...currentOptions, [category]: checked };

      const count = countSelectedCategories(newOptions);

      // 0 selected categories is not allowed
      // so we return the current options unchanged.
      if (count === 0) {
        return currentOptions;
      }

      return {
        ...newOptions,
        // Length is at least the number of selected categories
        length: ensureMinimumPasswordLength(currentOptions.length, newOptions),
      };
    });
  }

  function handleLengthChange(newLength: number) {
    setOptions((currentOptions) => ({
      ...currentOptions,
      length: ensureMinimumPasswordLength(newLength, currentOptions),
    }));
  }

  // Password strength
  const strength = estimatePasswordStrength(options);

  return (
    <main className="page">
      <section className="password-generator" aria-labelledby="generator-title">
        <h1 id="generator-title" className="generator-title">
          Password Generator
        </h1>

        <div className="password-output">
          <span className="password-value">P4$5W0rD!</span>
        </div>

        <div className="generator-panel">
          <CharacterLengthSlider
            length={options.length}
            minLength={countSelectedCategories(options)}
            onLengthChange={handleLengthChange}
          />

          <CharacterOptions
            selectedOptions={options}
            onOptionsSelection={handleCategoryChange}
          />

          <StrengthIndicator strength={strength} />

          <div className="generate-button">{`Generate ->`}</div>
        </div>
      </section>
    </main>
  );
}
