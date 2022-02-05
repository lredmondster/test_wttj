import { render, screen } from "@testing-library/react";
import { createTheme, WuiProvider } from "@welcome-ui/core";

import apiResponse from "@mocks/apiResponse";

import Index from "../pages/[[...slug]]";

const theme = createTheme();

describe("Index", () => {
  it("renders a heading", () => {
    console.log(apiResponse.name);
    render(
      <WuiProvider theme={theme} hasGlobalStyle reactRootId="__next">
        <Index jobs={apiResponse.jobs} organizationName={apiResponse.name} />,
      </WuiProvider>,
    );

    const heading = screen.getByRole("heading", {
      name: /welcome to next\.js!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
