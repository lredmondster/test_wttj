import type { SearchAndFilters } from "@components/[[...slug]]/types";
import toggleElementInArray from "@utils/toggleElementInArray";

export const reducer = (
  state: SearchAndFilters,
  action: { type: string; payload: string },
) => {
  switch (action.type) {
    case "SET_JOB_SEARCH_VALUE":
      return { ...state, jobSearchValue: action.payload };
    case "SET_FILTER_BY_OFFICES":
      return {
        ...state,
        filterByOffices: toggleElementInArray(
          state.filterByOffices,
          action.payload,
        ),
      };
    case "SET_FILTER_BY_DEPARTMENTS":
      return {
        ...state,
        filterByDepartments: toggleElementInArray(
          state.filterByDepartments,
          action.payload,
        ),
      };
    case "RESET_ALL":
      return {
        jobSearchValue: "",
        filterByOffices: [],
        filterByDepartments: [],
      };
    default:
      return state;
  }
};

export const initialState = {
  jobSearchValue: "",
  filterByOffices: [],
  filterByDepartments: [],
};
