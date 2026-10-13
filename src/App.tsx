import React from "react";
import "./App.css";
import {
  CharacterLengthSlider,
  CharacterOptions,
  DEFAULT_OPTIONS,
  StrengthIndicator,
} from "./components";
import { estimatePasswordStrength } from "./domain/strength";

export default function App() {
  const [selected, setSelected] = React.useState(DEFAULT_OPTIONS);
  const strength = estimatePasswordStrength(selected);

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
          <CharacterLengthSlider />

          <CharacterOptions selected={selected} setSelected={setSelected} />

          <StrengthIndicator strength={strength} />

          <div className="generate-button">{`Generate ->`}</div>
        </div>
      </section>
    </main>
  );
}
