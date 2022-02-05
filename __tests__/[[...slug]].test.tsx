import { render, screen } from "@testing-library/react";
import singletonRouter, { useRouter } from "next/router";

import { createTheme, WuiProvider } from "@welcome-ui/core";
import { I18nextProvider } from "react-i18next";
import i18n from "../__mocks__/i18nForTests";

import apiResponse from "@mocks/apiResponse.json";

import Index from "../pages/[[...slug]]";

import mockRouter from "next-router-mock";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

const theme = createTheme();
beforeEach(() => {
  mockRouter.setCurrentUrl("/");
});

describe("Index", () => {
  it("renders a heading", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <WuiProvider theme={theme} hasGlobalStyle reactRootId="__next">
          <Index jobs={apiResponse.jobs} organizationName={apiResponse.name} />
        </WuiProvider>
      </I18nextProvider>,
    );

    const heading = screen.getByRole("heading", {
      name: /welcome to next\.js!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
