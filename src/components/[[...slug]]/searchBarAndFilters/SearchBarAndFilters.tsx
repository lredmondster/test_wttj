import { useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";
import { Formik, Form, Field } from "formik";
import { Box } from "@welcome-ui/box";
import { InputText } from "@welcome-ui/input-text";
import { Select, OptionValue } from "@welcome-ui/select";
import { Label } from "@welcome-ui/label";

import type { JobsEntity } from "@components/[[...slug]]/types";

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
  const [jobSearchValue, setJobSearchValue] = useState("");
  const [filterByOffices, setFilterByOffices] = useState([]);
  const [filterByDepartments, setFilterByDepartments] = useState([]);

  // TO GET RID OF WHEN TIME, DISGUSTING
  const dropDownHeaders = [
    {
      key: "office",
      label: "Offices",
      state: filterByOffices as string[],
      setState: setFilterByOffices as (
        val: string[] | ((val: string[]) => string[]),
      ) => void,
    },
    {
      key: "department",
      label: "Departments",
      state: filterByDepartments as string[],
      setState: setFilterByDepartments as (
        val: string[] | ((val: string[]) => string[]),
      ) => void,
    },
  ];

  useEffect(() => {
    const filteredJobValues = jobs.filter(
      job =>
        job.name.includes(jobSearchValue) &&
        dropDownHeaders.every(
          ({ key, state }) =>
            !state.length || state.includes((job as any)[key].name),
        ),
    );
    setFilteredJobs(filteredJobValues);
  }, [jobSearchValue, filterByOffices, filterByDepartments]);

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
                value={jobSearchValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setJobSearchValue(e.target.value)
                }
              />
              <GroupByFilters
                jobs={jobs}
                jobSearchValue={jobSearchValue}
                dropDownHeaders={dropDownHeaders}
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
