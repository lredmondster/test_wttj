// import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, WuiProvider } from "@welcome-ui/core";
import { appWithTranslation } from "next-i18next";

const theme = createTheme();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WuiProvider theme={theme} hasGlobalStyle reactRootId="__next">
      <Component {...pageProps} />
    </WuiProvider>
  );
}

export default appWithTranslation(MyApp);
