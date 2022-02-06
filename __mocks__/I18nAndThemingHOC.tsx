import type { ReactNode } from "react";
import { createTheme, WuiProvider } from "@welcome-ui/core";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18nForTests";

const theme = createTheme();

const I18nAndThemingHOC = ({ children }: { children: ReactNode }) => (
  <I18nextProvider i18n={i18n}>
    <WuiProvider theme={theme} hasGlobalStyle reactRootId="__next">
      {children}
    </WuiProvider>
  </I18nextProvider>
);

export default I18nAndThemingHOC;
