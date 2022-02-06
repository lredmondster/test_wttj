import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { within } from "@testing-library/dom";

import singletonRouter, { useRouter } from "next/router";

import I18nAndThemingHOC from "@mocks/I18nAndThemingHOC";

import apiResponse from "@mocks/apiResponse.json";

import Index from "../pages/[[...slug]]";

import mockRouter from "next-router-mock";

jest.mock("next/dist/client/router", () => require("next-router-mock"));

beforeEach(() => {
  mockRouter.setCurrentUrl("/");
});

describe("Index Page", () => {
  describe("Search Bar Interactions", () => {
    it("PAGINATION", () => {
      const { getAllByTestId, getByText, container } = render(
        <I18nAndThemingHOC>
          <Index jobs={apiResponse.jobs} organizationName={apiResponse.name} />
        </I18nAndThemingHOC>,
      );

      const paginationSelect = container.querySelector(
        "#pagination-select",
      ) as HTMLElement;

      const allHits = getAllByTestId("JobHit").length;

      expect(getByText("25")).toBeInTheDocument();
      expect(allHits).toBe(25);
      userEvent.click(paginationSelect);
      const paginationSelectMenu = container.querySelector(
        "#pagination-select-menu",
      ) as HTMLElement;

      userEvent.click(within(paginationSelectMenu).getByText("10"));
      expect(getAllByTestId("JobHit").length).toBe(10);
    });

    it("Search Bar", () => {
      const { getAllByTestId, queryByTestId, container } = render(
        <I18nAndThemingHOC>
          <Index jobs={apiResponse.jobs} organizationName={apiResponse.name} />
        </I18nAndThemingHOC>,
      );

      const searchInput = container.querySelector("#search") as HTMLElement;
      const allHits = getAllByTestId("JobHit").length;

      expect(allHits).toBe(25);
      userEvent.type(searchInput, "Ca");
      expect(getAllByTestId("JobHit").length).toBe(4);
      userEvent.type(searchInput, "Caa");
      expect(queryByTestId("JobHit")).not.toBeInTheDocument();
    });

    it("Group By Interaction", async () => {
      const { getByTestId, getAllByTestId, getByText } = render(
        <I18nAndThemingHOC>
          <Index jobs={apiResponse.jobs} organizationName={apiResponse.name} />
        </I18nAndThemingHOC>,
      );

      const groupByDropDown = getByText("Group By");

      expect(getAllByTestId("JobHit").length).toBe(25);
      userEvent.click(groupByDropDown);
      userEvent.click(
        within(getByTestId("dropdown-menu-open")).getByDisplayValue("Prague"),
      );

      expect(getAllByTestId("JobHit").length).toBe(2);
      getAllByTestId("JobHit").forEach((node: HTMLElement) =>
        expect(within(node).queryByText("Prague")).toBeInTheDocument(),
      );
      await waitFor(() =>
        userEvent.click(
          within(getByTestId("dropdown-menu-open")).getByDisplayValue("Media"),
        ),
      );

      expect(getAllByTestId("JobHit").length).toBe(1);

      await waitFor(() =>
        userEvent.click(
          within(getByTestId("dropdown-menu-open")).getByDisplayValue("Paris"),
        ),
      );
      expect(getAllByTestId("JobHit").length).toBe(8);
    });
  });
  describe("Results List", () => {
    it("Open Modal", () => {
      const { queryAllByText, getAllByText, container } = render(
        <I18nAndThemingHOC>
          <Index jobs={apiResponse.jobs} organizationName={apiResponse.name} />
        </I18nAndThemingHOC>,
      );

      expect(
        // @ts-ignore: Object is possibly 'null'.
        queryAllByText("Sales Development Representative - Outbound")[1]
          .closest("div")
          .closest("div"),
      ).toHaveAttribute("hidden");

      userEvent.click(getAllByText("See More")[0]);

      expect(
        // @ts-ignore: Object is possibly 'null'.
        queryAllByText("Sales Development Representative - Outbound")[1]
          .closest("div")
          .closest("div"),
      ).not.toHaveAttribute("hidden");

      // Should check the routing
    });
  });
});
