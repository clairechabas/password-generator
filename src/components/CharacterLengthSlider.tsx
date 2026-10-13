import React from "react";
import { MAX_LENGTH, MIN_LENGTH } from "../domain/password";
import "./CharacterLengthSlider.css";

export function CharacterLengthSlider(props: {
  length: number;
  minLength: number;
  onLengthChange: (length: number) => void;
}) {
  const { length, minLength, onLengthChange } = props;

  const progress = ((length - MIN_LENGTH) / (MAX_LENGTH - MIN_LENGTH)) * 100;

  return (
    <div className="character-length">
      <div className="length-indicator">
        <label htmlFor="password-length" className="length-label">
          Character length
        </label>
        <output htmlFor="password-length" className="length-value">
          {length}
        </output>
      </div>

      <input
        type="range"
        id="password-length"
        min={minLength}
        max={MAX_LENGTH}
        value={length}
        onChange={(event) => onLengthChange(event.currentTarget.valueAsNumber)}
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
