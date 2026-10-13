import type { PasswordStrength, StrengthLevel } from "../domain/strength";
import { assertNever } from "../utils";
import "./StrengthIndicator.css";

interface StrengthIndicatorProps {
  strength: PasswordStrength;
}

export function StrengthIndicator(props: StrengthIndicatorProps) {
  const { strength } = props;
  const activeBars = LEVEL_BARS[strength.level];

  return (
    <div className="strength-indicator">
      <span className="strength-label">Strength</span>

      <div className="strength-result">
        <span className="strength-value">
          {getStrengthLabel(strength.level)}
        </span>
      </div>

      <div className="strength-bars" aria-hidden="true">
        {Object.values(LEVEL_BARS).map((bar) => (
          <span
            key={bar}
            className={`strength-bar ${bar <= activeBars ? "strength-bar--active" : ""}`}
            data-level={strength.level}
          />
        ))}
      </div>
    </div>
  );
}

function getStrengthLabel(strengthLevel: StrengthLevel): string {
  switch (strengthLevel) {
    case "too-weak":
      return "Too weak";
    case "weak":
      return "Weak";
    case "medium":
      return "Medium";
    case "strong":
      return "Strong";
    default:
      return assertNever(strengthLevel);
  }
}

const LEVEL_BARS = {
  "too-weak": 1,
  weak: 2,
  medium: 3,
  strong: 4,
};
