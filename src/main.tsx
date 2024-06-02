import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { App } from "./App";
import { NavigationProvider } from "./providers/NavigationProvider";
import { DogProvider } from "./providers/DogProvider";
import "./index.css";
import "./App.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DogProvider>
      <NavigationProvider>
        <Toaster />
        <App />
      </NavigationProvider>
    </DogProvider>
  </React.StrictMode>
);
