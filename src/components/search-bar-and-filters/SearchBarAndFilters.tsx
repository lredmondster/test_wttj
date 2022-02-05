import { useEffect, useState, ChangeEvent } from "react";
import { Formik, Form, Field } from "formik";
import { Box } from "@welcome-ui/box";
import { Text } from "@welcome-ui/text";
import { Button } from "@welcome-ui/button";
import Image from "next/image";

import { InputText } from "@welcome-ui/input-text";
import { Select } from "@welcome-ui/select";
import { Checkbox } from "@welcome-ui/checkbox";
import { Label } from "@welcome-ui/label";
import { Accordion } from "@welcome-ui/accordion";
import { DropdownMenu, useDropdownMenuState } from "@welcome-ui/dropdown-menu";

const getGroupByFilters = jobs =>
  jobs.reduce(
    (groupByFilters, { office, department }) => {
      const { offices, departments } = groupByFilters;

      return {
        offices: Object.prototype.hasOwnProperty.call(offices, office.name)
          ? { ...offices, [office.name]: offices[office.name] + 1 }
          : { ...offices, [office.name]: 1 },
        departments: Object.prototype.hasOwnProperty.call(
          departments,
          department.name,
        )
          ? {
              ...departments,
              [department.name]: departments[department.name] + 1,
            }
          : { ...departments, [department.name]: 1 },
      };
    },
    { offices: {}, departments: {} },
  );

const toggleEl = (arr, item) =>
  arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];

const DropDownMenu = ({
  filteredJobs,
  setFilterByOffices,
  filterByOffices,
}) => {
  const menu = useDropdownMenuState({ gutter: 10, placement: "bottom-end" });

  // TRY WITH FIELD AS CHECKBOX CAUSE CONTROLED COMPONENT BULLSHIT

  const groupByFilters = getGroupByFilters(filteredJobs);

  return (
    <>
      <DropdownMenu.Trigger {...menu} as={Button}>
        Dropdown Menu MENU MENU MENU
      </DropdownMenu.Trigger>
      <DropdownMenu {...menu} aria-label="Example">
        {Object.entries(groupByFilters).map(
          ([groupByFilterName, groupByFilterValues]) => (
            <Box key={groupByFilterName}>
              <Accordion
                as={Box}
                title={
                  <Text margin="0" paddingRight="50px">
                    {groupByFilterName}
                  </Text>
                }
                w="200px"
              >
                {Object.entries(groupByFilterValues).map(
                  ([valueName, valueCount]) => (
                    <Box key={valueName} display="flex">
                      <Checkbox
                        checked={filterByOffices.includes(valueName)}
                        backgroundColor="nude.100"
                        value={valueName}
                        name={valueName}
                        onChange={e =>
                          setFilterByOffices(offices => {
                            console.log(e.target.value);
                            console.log(toggleEl(offices, e.value));
                            return toggleEl(offices, e.target.value);
                          })
                        }
                      />
                      <Label>
                        {valueName}
                        <Text>{valueCount}</Text>
                      </Label>
                    </Box>
                  ),
                )}
              </Accordion>
            </Box>
          ),
        )}
      </DropdownMenu>
    </>
  );
};

const paginationOptions = [10, 25, 50, 100].map(val => ({
  value: val,
  label: val.toString(),
}));

const SearchBarAndFilters = ({
  jobs,
  filteredJobs,
  setFilteredJobs,
  pagination,
  setPagination,
}) => {
  const [jobValue, setJobValue] = useState("");

  const [filterByOffices, setFilterByOffices] = useState([]);

  useEffect(() => {
    const filteredJobValues = jobs.filter(job => {
      return (
        job.name.includes(jobValue) &&
        (!filterByOffices.length || filterByOffices.includes(job.office.name))
      );
    });

    setFilteredJobs(filteredJobValues);
  }, [jobValue, filterByOffices]);

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
        <Formik>
          {() => (
            <Form>
              <Field
                as={InputText}
                id="search"
                name="search"
                placeholder="Search"
                value={jobValue.length ? jobValue : undefined}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setJobValue(e.target.value)
                }
              />
              <DropDownMenu
                filteredJobs={filteredJobs}
                filterByOffices={filterByOffices}
                setFilterByOffices={setFilterByOffices}
              />
              <Label>Pagination</Label>
              <Select
                options={paginationOptions}
                id="pagination-select"
                name="pagination-select"
                value={pagination}
                onChange={val => {
                  setPagination(val);
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
