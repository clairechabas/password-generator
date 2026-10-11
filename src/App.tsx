import "./App.css";

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
          <div className="length-indicator">
            <span className="length-label">Character length</span>
            <span className="length-value">10</span>
          </div>

          <div className="controls">Configuration controls</div>

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
