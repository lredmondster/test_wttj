import { ChangeEvent } from "react";
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
  DropDownHeaderEntity,
} from "@components/[[...slug]]/types";
import toggleElementInArray from "@utils/toggleElementInArray";

import getGroupByFilters from "./helpers";

const GroupByFilters = ({
  jobs,
  jobSearchValue,
  dropDownHeaders,
}: {
  jobs: JobsEntity[];
  jobSearchValue: string;
  dropDownHeaders: DropDownHeaderEntity[];
}) => {
  const menu = useDropdownMenuState({ gutter: 10, placement: "bottom-start" });

  const DropDownHeadersWithFilters = dropDownHeaders.map(
    (header, _, allHeaders) => ({
      ...header,
      values: getGroupByFilters(jobs, jobSearchValue, header, allHeaders),
    }),
  );

  return (
    <>
      <DropdownMenu.Trigger {...menu} as={Button}>
        Group By
      </DropdownMenu.Trigger>
      <DropdownMenu
        {...menu}
        aria-label="Example"
        data-testid="dropdown-menu-open"
      >
        {DropDownHeadersWithFilters.map(
          ({ label, values, state, setState }) => (
            <Box key={label}>
              <Accordion
                as={Box}
                title={
                  <Text margin="0" paddingRight="50px">
                    {label}
                  </Text>
                }
                w="200px"
              >
                {Object.entries(values).map(([valueName, valueCount]) => (
                  <Box key={valueName} display="flex">
                    <Field
                      as={Checkbox}
                      checked={state.includes(valueName)}
                      backgroundColor="nude.100"
                      value={valueName}
                      name={valueName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setState((oldFilterArray: string[]) =>
                          toggleElementInArray(oldFilterArray, e.target.value),
                        )
                      }
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
