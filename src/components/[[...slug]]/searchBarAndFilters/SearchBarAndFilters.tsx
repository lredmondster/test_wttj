import { useEffect, useReducer, ChangeEvent } from "react";
import Image from "next/image";
import { Formik, Form, Field } from "formik";
import { Box } from "@welcome-ui/box";
import { InputText } from "@welcome-ui/input-text";
import { Select, OptionValue } from "@welcome-ui/select";
import { Label } from "@welcome-ui/label";

import type { JobsEntity } from "@components/[[...slug]]/types";
import GROUP_BY_FILTERS_MAPPING from "@constants/groupByFiltersMapping";

import { reducer, initialState } from "./reducer";
import GroupByFilters from "./groupByFilters";

const paginationOptions = [10, 25, 50, 100].map(val => ({
  value: val,
  label: val.toString(),
}));

const SearchBarAndFilters = ({
  jobs,
  itemsPerPage,
  setFilteredJobs,
  setItemsPerPage,
}: {
  jobs: JobsEntity[];
  setFilteredJobs: (jobs: JobsEntity[]) => void;
  itemsPerPage: number;
  setItemsPerPage: (itemsPerPage: number) => void;
}) => {
  const [searchAndFilters, dispatchSearchAndFilters] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    const { jobSearchValue } = searchAndFilters;
    const filteredJobValues = jobs.filter(
      job =>
        job.name.includes(jobSearchValue) &&
        GROUP_BY_FILTERS_MAPPING.every(
          ({ keyInStore, keyInApi }) =>
            !(searchAndFilters as any)[keyInStore].length ||
            (searchAndFilters as any)[keyInStore].includes(
              (job as any)[keyInApi].name,
            ),
        ),
    );
    setFilteredJobs(filteredJobValues);
  }, [searchAndFilters]);

  return (
    <Box
      display="flex"
      w={1}
      justifyContent="center"
      alignItems="center"
      padding="md"
      backgroundColor="light.900"
    >
      <Image
        width={250}
        height="100%"
        objectFit="contain"
        alt="Welcome to the Jungle Logo"
        src="https://cdn.welcometothejungle.com/wttj-front/production/assets/images/logos/wttj.svg?v=b8e771a8e9f1e6330aad9763b4f396da"
      />
      <Box display="flex">
        <Formik initialValues={{}} onSubmit={() => {}}>
          {() => (
            <Form>
              <Field
                as={InputText}
                id="search"
                name="search"
                placeholder="Search"
                value={searchAndFilters.jobSearchValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  dispatchSearchAndFilters({
                    type: "SET_JOB_SEARCH_VALUE",
                    payload: e.target.value,
                  })
                }
              />
              <GroupByFilters
                jobs={jobs}
                searchAndFilters={searchAndFilters}
                dispatchSearchAndFilters={dispatchSearchAndFilters}
              />
              <Label>Pagination</Label>
              <Field
                as={Select}
                options={paginationOptions}
                id="pagination-select"
                name="pagination-select"
                value={itemsPerPage}
                onChange={(val: OptionValue | OptionValue[]) => {
                  setItemsPerPage(val as number);
                }}
              />
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default SearchBarAndFilters;
