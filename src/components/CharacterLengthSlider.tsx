import React from "react";
import { MAX_LENGTH, MIN_LENGTH } from "../domain/password";
import "./CharacterLengthSlider.css";

const DEFAULT_LENGTH = 10;

export function CharacterLengthSlider() {
  const [length, setLength] = React.useState(DEFAULT_LENGTH);
  const progress = ((length - MIN_LENGTH) / (MAX_LENGTH - MIN_LENGTH)) * 100;

  return (
    <div className="character-length">
      <div className="length-indicator">
        <label htmlFor="password-length" className="length-label">Character length</label>
        <output htmlFor="password-length" className="length-value">{length}</output>
      </div>

      <input
        type="range"
        id="password-length"
        min={MIN_LENGTH}
        max={MAX_LENGTH}
        value={length}
        onChange={(event) => setLength(event.currentTarget.valueAsNumber)}
        className="length-slider"
        style={
          {
            "--slider-progress": `${progress}%`,
          } as React.CSSProperties
        }
      />
    </div>
  );
}
