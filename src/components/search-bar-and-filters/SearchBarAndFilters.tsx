import { useEffect, useState, ChangeEvent } from "react";
import { Formik, Form, Field } from "formik";
import { Box } from "@welcome-ui/box";
import { InputText } from "@welcome-ui/input-text";
import { Select } from "@welcome-ui/select";
import { Checkbox } from "@welcome-ui/checkbox";

const SearchBarAndFilters = ({ jobs, setFilteredJobs }) => {
  const [jobValue, setJobValue] = useState("");

  const selectOptions = [{ value: "test", label: "test" }];

  useEffect(() => {
    const newVal = jobs.filter(job => job.name.includes(jobValue));

    setFilteredJobs(newVal);
  }, [jobValue]);

  return (
    <Box
      display="flex"
      w={1}
      justifyContent="center"
      alignItems="center"
      padding="md"
      backgroundColor="light.900"
    >
      <img
        width="250px"
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
                value={jobValue.length ? jobValue : null}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setJobValue(e.target.value)
                }
              />
              <Field
                as={Select}
                allowUnselectFromList
                disableCloseOnSelect
                options={selectOptions}
                name="color"
                renderItem={(item, selected) => {
                  return (
                    <Box display="flex" justifyContent="space-between">
                      {item.label}
                      <Box>
                        <Checkbox type="checkbox" checked={selected} />
                      </Box>
                    </Box>
                  );
                }}
              ></Field>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default SearchBarAndFilters;
