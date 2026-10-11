import "./App.css";
import { CharacterLengthSlider } from "./components";

export default function App() {
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

          <div className="controls">Character categories controls</div>

          <div className="strength-indicator">
            <span className="strength-label">Strength</span>
            <span className="strength-value">MEDIUM</span>
          </div>

          <div className="generate-button">{`Generate ->`}</div>
        </div>
      </section>
    </main>
  );
}
