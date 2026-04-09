import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import betterAuthLogo from "./assets/better-auth.svg";
import convexLogo from "./assets/convex.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <section id="center">
        <div className="hero-group">
          <div className="hero">
            <img
              src={heroImg}
              className="base"
              width="170"
              height="179"
              alt=""
            />
            <img src={reactLogo} className="framework" alt="React logo" />
            <img src={viteLogo} className="vite" alt="Vite logo" />
          </div>
          <div className="hero">
            <img
              src={heroImg}
              className="base"
              width="170"
              height="179"
              alt=""
            />
            <img
              src={betterAuthLogo}
              className="framework"
              alt="Better Auth logo"
            />
            <img src={convexLogo} className="vite" alt="Convex logo" />
          </div>
        </div>
        <div>
          <h1>Get started</h1>
          {/* <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p> */}
          <div className="intro-text">
            <p>
              This is a starter template for building full-stack apps quickly.
            </p>
            <p>
              It includes an initial setup with Vite, React, Convex, and Better
              Auth for authentication and authorization using email/password and
              Google Sign-In. Everything else is up to you to build.
            </p>
            <p>
              Make sure to read the <code>README</code> file. Have fun building!
              🚀
            </p>
          </div>
        </div>
        {/* <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button> */}
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>You might need these</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="https://docs.convex.dev/home" target="_blank">
                Convex
              </a>
            </li>
            <li>
              <a href="https://docs.convex.dev/self-hosting" target="_blank">
                Self hosted Convex
              </a>
            </li>
            <li>
              <a href="https://docs.convex.dev/home" target="_blank">
                Convex + Better-auth
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect</h2>
          <p>Need help? Reach out!</p>
          <ul>
            <li>
              <a href="https://github.com/bebigomez" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/victorgomezdev" target="_blank">
                LinkedIn
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
