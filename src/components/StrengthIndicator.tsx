import type { PasswordStrength } from "../domain/strength";
import "./StrengthIndicator.css";

interface StrengthIndicatorProps {
  strength: PasswordStrength | null;
}

export function StrengthIndicator(props: StrengthIndicatorProps) {
  const { strength } = props;
  const activeBars = strength ? LEVEL_BARS[strength.level] : 0;

  return (
    <div className="strength-indicator">
      <span className="strength-label">Strength</span>

      <div className="strength-result">
        <span className="strength-value">
          {strength ? LEVEL_LABELS[strength.level] : "Unavailable"}
        </span>
      </div>

      <div className="strength-bars" aria-hidden="true">
        {[1, 2, 3, 4].map((bar) => (
          <span
            key={bar}
            className={`strength-bar ${bar <= activeBars ? "strength-bar--active" : ""}`}
            data-level={strength?.level}
          />
        ))}
      </div>
    </div>
  );
}

const LEVEL_LABELS = {
  "too-weak": "Too weak",
  weak: "Weak",
  medium: "Medium",
  strong: "Strong",
};

const LEVEL_BARS = {
  "too-weak": 1,
  weak: 2,
  medium: 3,
  strong: 4,
};
