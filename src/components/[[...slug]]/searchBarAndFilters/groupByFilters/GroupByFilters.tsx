import { ChangeEvent, Dispatch } from "react";
import { Field } from "formik";
import { Box } from "@welcome-ui/box";
import { DropdownMenu, useDropdownMenuState } from "@welcome-ui/dropdown-menu";
import { Accordion } from "@welcome-ui/accordion";
import { Button } from "@welcome-ui/button";
import { Text } from "@welcome-ui/text";
import { Label } from "@welcome-ui/label";
import { Checkbox } from "@welcome-ui/checkbox";

import type {
  JobsEntity,
  SearchAndFilters,
} from "@components/[[...slug]]/types";
import GROUP_BY_FILTERS_MAPPING from "@constants/groupByFiltersMapping";

import getGroupByFilters from "./helpers";

const GroupByFilters = ({
  jobs,
  searchAndFilters,
  dispatchSearchAndFilters,
}: {
  jobs: JobsEntity[];
  searchAndFilters: SearchAndFilters;
  dispatchSearchAndFilters: Dispatch<{ type: string; payload: string }>;
}) => {
  const menu = useDropdownMenuState({ gutter: 10, placement: "bottom-start" });

  const DropDownHeadersWithFilters = GROUP_BY_FILTERS_MAPPING.map(
    (header, _, allHeaders) => ({
      ...header,
      values: getGroupByFilters(jobs, searchAndFilters, header, allHeaders),
    }),
  );

  return (
    <>
      <DropdownMenu.Trigger {...menu} as={Button} variant="secondary">
        Group By
      </DropdownMenu.Trigger>
      <DropdownMenu
        {...menu}
        aria-label="Example"
        data-testid="dropdown-menu-open"
      >
        {DropDownHeadersWithFilters.map(
          ({ label, keyInStore, type, values }) => (
            <Box key={keyInStore}>
              <Accordion
                as={Box}
                title={
                  <Text margin="0" paddingRight="50px">
                    {label}
                  </Text>
                }
                w="200px"
              >
                {Object.entries(values)
                  .sort()
                  .map(([valueName, valueCount]) => (
                    <Box key={`${keyInStore}${valueName}`} display="flex">
                      <Field
                        as={Checkbox}
                        checked={(searchAndFilters as any)[keyInStore].includes(
                          valueName,
                        )}
                        backgroundColor="nude.100"
                        value={valueName}
                        name={valueName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          dispatchSearchAndFilters({
                            type,
                            payload: e.target.value,
                          });
                        }}
                      />
                      <Label>
                        {valueName}
                        <Text>{valueCount}</Text>
                      </Label>
                    </Box>
                  ))}
              </Accordion>
            </Box>
          ),
        )}
      </DropdownMenu>
    </>
  );
};

export default GroupByFilters;
