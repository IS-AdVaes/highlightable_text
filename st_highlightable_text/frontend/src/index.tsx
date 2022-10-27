import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import TextZone from "./TextZone";

import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { ThemeProvider, LightTheme } from "baseui";

const engine = new Styletron();


const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <StyletronProvider value={engine}>
      <ThemeProvider theme={LightTheme}>
        <TextZone />
      </ThemeProvider>
    </StyletronProvider>
  </StrictMode>
);
