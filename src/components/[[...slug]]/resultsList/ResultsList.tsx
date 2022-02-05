import { useState } from "react";
import { Box } from "@welcome-ui/box";
import { Pagination } from "@welcome-ui/pagination";

import type { JobsEntity } from "@components/[[...slug]]/types";
import JobHit from "./jobHit";

const ResultsList = ({
  filteredJobs,
  organizationName,
  itemsPerPage,
}: {
  filteredJobs: JobsEntity[];
  organizationName: string;
  itemsPerPage: number;
}) => {
  const [page, setPage] = useState(0);

  const amtOfPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const currentJobArray = filteredJobs.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage < filteredJobs.length
      ? (page + 1) * itemsPerPage
      : filteredJobs.length,
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      w={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="nude.100"
      overflow="hidden"
    >
      <Box w={"70%"} display="flex" flexDirection="column" overflow="auto">
        {currentJobArray.map((job: any) => {
          return (
            <JobHit
              key={job.id}
              organizationName={organizationName}
              job={job}
            />
          );
        })}
        <Pagination
          aria-label="Pagination"
          page={page + 1}
          onChange={(val: number) => setPage(val - 1)}
          pageCount={amtOfPages}
        />
      </Box>
    </Box>
  );
};

export default ResultsList;
