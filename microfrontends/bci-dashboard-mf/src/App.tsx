import { useState } from "react";
import "./App.css";

const BASE_URL = "http://localhost:5173";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {" "}
      <section id="center">
        {" "}
        <div className="hero">
          <img src={`${BASE_URL}/hero.png`} className="base" width="170" height="179" alt="" />
          <img src={`${BASE_URL}/react.svg`} className="framework" alt="React logo" />
          <img src={`${BASE_URL}/vite.svg`} className="vite" alt="Vite logo" />{" "}
        </div>
        ```
        <div
          style={{
            backgroundColor: "red",
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            padding: "10px",
          }}
        >
          <h1 style={{ color: "black", margin: 0 }}>Get started</h1>
          <p style={{ margin: 0 }}>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button className="counter" onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
      </section>
      <div className="ticks"></div>
      <section id="next-steps">
        <div id="docs">
          <h2>📄 Documentation</h2>
          <p>Your questions, answered</p>

          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank" rel="noreferrer">
                <img className="logo" src={`${BASE_URL}/vite.svg`} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" rel="noreferrer">
                <img className="button-icon" src={`${BASE_URL}/react.svg`} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>

        <div id="social">
          <h2>🌐 Connect with us</h2>
          <p>Join the Vite community</p>

          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank" rel="noreferrer">
                🐙 GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank" rel="noreferrer">
                💬 Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank" rel="noreferrer">
                🐦 X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank" rel="noreferrer">
                ☁️ Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>
      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
