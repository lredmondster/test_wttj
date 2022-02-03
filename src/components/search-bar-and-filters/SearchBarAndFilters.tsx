import { useState, ChangeEvent } from "react";
import { Formik, Form, Field } from "formik";
import { Box } from "@welcome-ui/box";
import { InputText } from "@welcome-ui/input-text";

const SearchBarAndFilters = () => {
  const [jobValue, setJobValue] = useState("");

  return (
    <Box
      display="flex"
      w={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="nude.100"
    >
      <Formik
        initialValues={{ search: "" }}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              as={InputText}
              id="search"
              name="search"
              value={jobValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setJobValue(e.target.value)
              }
            />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SearchBarAndFilters;
