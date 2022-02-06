import { useEffect, useReducer, ChangeEvent } from "react";
import Image from "next/image";
import { Formik, Form, Field } from "formik";
import { Box } from "@welcome-ui/box";
import { Button } from "@welcome-ui/button";
import { InputText } from "@welcome-ui/input-text";
import { Select, OptionValue } from "@welcome-ui/select";
import { Label } from "@welcome-ui/label";
import { SearchIcon } from "@welcome-ui/icons.search";

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
      flexDirection="column"
      w={1}
      justifyContent="center"
      alignItems="center"
      padding="md"
      backgroundColor="light.900"
      borderBottom="solid"
      borderColor="primary.100"
      borderWidth={2}
      boxShadow="sm"
    >
      <Image
        width={250}
        height="100%"
        objectFit="contain"
        alt="Welcome to the Jungle Logo"
        src="https://cdn.welcometothejungle.com/wttj-front/production/assets/images/logos/wttj.svg?v=b8e771a8e9f1e6330aad9763b4f396da"
      />
      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => (
          <Form>
            <Label>Your dream job?</Label>
            <Box display="flex" paddingBottom={15}>
              <Field
                as={InputText}
                id="search"
                icon={<SearchIcon />}
                w={300}
                marginRight={5}
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
            </Box>
            <Box
              display="flex"
              marginLeft="auto"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Button
                paddingRight={20}
                variant="quaternary"
                onClick={() =>
                  dispatchSearchAndFilters({ type: "RESET_ALL", payload: "" })
                }
              >
                Clear all
              </Button>
              <Box w={75}>
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
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SearchBarAndFilters;
