import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <NextUIProvider>
    <NextThemesProvider attribute='class' defaultTheme='dark'>
      <App />
    </NextThemesProvider>
  </NextUIProvider>
  </BrowserRouter>
);
