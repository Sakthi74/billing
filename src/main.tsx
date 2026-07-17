import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="bg-[#f1f5f9]">
      <App />
    </div>
  </StrictMode>,
);
